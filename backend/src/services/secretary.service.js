const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../helpers");
const { constants } = require("../utils");
const { examRepository, userRepository, classRepository, paymentRepository, registrationRepository } = require("../repositories");
const { promisify } = require("util");

module.exports = {
    getExam: async (CPF) => {
        const exam = await examRepository.get({ CPF })
        console.log("Exame pego do banco")
        console.log(exam)
        
        if(!exam){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("exam"),
            };
        }

        return exam
    },

    newUser: async (CPF, type, name, RG, birth, fone, email, cardNumber, flag, ownerName) => {
        const user = await userRepository.get({ CPF })

        if(user){
            throw{
                status: StatusCodes.CONFLICT,
                message: messages.alreadyExists("user"),
            };
        }

        newUser = {
            CPF,
            type,
            name,
            RG,
            birth,
            fone,
            email,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const saved = await userRepository.create(newUser)

        const payment = await paymentRepository.create({
            userId: saved.id,
            cardNumber,
            flag,
            ownerName,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        return [saved, payment]
    },

    getClasses: async () => {
        const classes = await classRepository.list()

        if(!classes){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("classes"),
            };
        }

        modalities = []
        for (const cls of classes['rows']) {
            if(!modalities.includes(cls.modality))
                modalities.push(cls.modality)
        }

        cl = []
        for(let i = 0 ; i<modalities.length; i++){
            cl.push({
                modality: modalities[i],
                days: []
            })

            for (const cls of classes['rows']) {
                if(cls.modality == modalities[i])
                cl[i].days.push({
                    id: cls.id,
                    time: cls.time,
                    weekDay: cls.weekDay,
                    full: cls.full
                })
            }
        }

        return cl
    },

    newRegistration: async (CPF, schemeId, timeId) => {
        const user = await userRepository.get({ CPF })

        if(!user){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("user"),
            };
        }
        

        const registration = {
            userId: user.id,
            schemeId,
            timeId,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const saved = await registrationRepository.create(registration)

        return saved
    }
}