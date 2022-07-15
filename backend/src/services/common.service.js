const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../helpers");
const { constants } = require("../utils");
const { schemeRepository, userRepository, loginRepository } = require("../repositories");
const { promisify } = require("util");


function tranform (scheme){
    return {
        modality: scheme.modality,
        paymentFrequencies: {
            paymentFrequency: scheme.paymentFrequency,
            trainingFrequencies: {
                trainingFrequency: scheme.trainingFrequency,
                id: scheme.id,
                price: scheme.price,
                createdAt: scheme.createdAt,
                updatedAt: scheme.updatedAt
            }
        }
    }
}

groupByModality = []

module.exports = {
    getSchemes: async () => {
        const schemes = await schemeRepository.getAll()

        ft = []
        schemes.forEach(sh => {
            ft.push(tranform(sh))
        });

        modalities = []
        schemes.forEach(sh => {
            if(!modalities.includes(sh.modality))
                modalities.push(sh.modality)
        })

        groupByModality = []
        for(i=0; i< modalities.length; i++){
            groupByModality.push({
                modality: modalities[i],
                paymentFrequencies: []
            })
        } 
        ft.forEach(sh => {
            for(i=0; i< modalities.length; i++){
                if(sh.modality == modalities[i]){
                    groupByModality[i]["paymentFrequencies"].push(sh["paymentFrequencies"])
                }
            }  
        })

        console.log("[Common] [GET schemes] group by modality")

        groupByPaymentFrequency = []
        for(i=0; i< modalities.length; i++){
            paymentFrequencies = []
            for (const pf of groupByModality[i].paymentFrequencies) {
                if(!paymentFrequencies.includes(pf["paymentFrequency"]))
                    paymentFrequencies.push(pf["paymentFrequency"])
            }

            groupByPaymentFrequency.push({
                modality: groupByModality[i].modality,
                paymentFrequencies: []
            })
            paymentFrequencies.forEach((pf) => {
                groupByPaymentFrequency[i].paymentFrequencies.push({
                    paymentFrequency: pf,
                    trainingFrequencies: []
                })
            })
            
            groupByModality[i].paymentFrequencies.forEach((pf) => {
                for(j=0; j<paymentFrequencies.length; j++){
                    if(pf.paymentFrequency == paymentFrequencies[j]){
                        groupByPaymentFrequency[i].paymentFrequencies[j].trainingFrequencies.push(pf.trainingFrequencies)
                    }
                }
            })
        }

        console.log("[Common] [GET schemes] group by payment frequency")

        return groupByPaymentFrequency
    },

    login: async (CPF, password, type) => {
        const user = await userRepository.get({ CPF })
        console.log("CPF: " + CPF)
        if(!user){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("user"),
            };   
        }

        const login = await loginRepository.get({ CPF })

        if(!login){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("login"),
            }; 
        }

        const valid = await encryptor.comparePassword(password, login.password);
        if (!valid) {
            throw {
                status: StatusCodes.UNAUTHORIZED,
                message: messages.invalidPassword,
            };
        }
        else {
            if(type == 'client') {
                if(user.type != 'client'){
                    throw {
                        status: StatusCodes.UNAUTHORIZED,
                        message: messages.invalidFields,
                    };
                }
            }
            else {
                if(type == 'employer'){
                    if(user.type == 'client'){
                        throw {
                            status: StatusCodes.UNAUTHORIZED,
                            message: messages.invalidFields,
                        };
                    }
                } 
            }
        }
        
        const payload = {
            id: user.id,
            CPF: user.CPF,
            type: user.type,
        };

        const sign = promisify(jwt.sign);
        const token = await sign(payload, constants.jwtToken);

        console.log("User " + user.name + " made login")

        return { type: user.type, token };
    },

    getUser: async (userId) => {
        const user = await userRepository.getById(userId)

        if(!user){
            throw{
                status: StatusCodes.notFound,
                message: messages.notFound("user"),
            };
        }

        return user
    }
}