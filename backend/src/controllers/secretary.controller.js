const { StatusCodes } = require("http-status-codes")
const { SecretaryService } = require("../services")
const { secretaryValidation } = require("../validations")
const yup = require("yup");

module.exports = {
    getExam: async (req, res) => {
        try {
            const schema = yup.object().shape({
                CPF: yup.string().required(),
            });
        
            await schema.validate(req.body, {
                stripUnknown: true,
            });
            
            const [scheme, token]  = req.headers.authorization.split(" ");
            const { CPF } = req.body;

            await secretaryValidation.isSecretary(token)

            const response = await SecretaryService.getExam(CPF)
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(error.messages);
        }
    },

    newUser: async (req, res) =>{
        try {
            const schema = yup.object().shape({
                CPF: yup.string().required(),
                type: yup.string().required(), 
                name: yup.string().required(), 
                RG: yup.string().required(), 
                birth: yup.date().required(), 
                fone: yup.string().required(), 
                email: yup.string().required(),
                cardNumber: yup.string().required(),
                flag: yup.string().required(),
                ownerName: yup.string().required(),
            });
        
            await schema.validate(req.body, {
                stripUnknown: true,
            });
            
            const [scheme, token]  = req.headers.authorization.split(" ");
            const { CPF, type, name, RG, birth, fone, email, cardNumber, flag, ownerName } = req.body;

            await secretaryValidation.isSecretary(token)

            const response = await SecretaryService.newUser(CPF, type, name, RG, birth, fone, email, cardNumber, flag, ownerName)
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(error.messages);
        }
    },

    getClasses: async (req, res) => {
        try {            
            const [scheme, token]  = req.headers.authorization.split(" ");

            await secretaryValidation.isSecretary(token)

            const response = await SecretaryService.getClasses()
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(error.messages);
        }
    },

    newRegistration: async (req, res) => {
         try {
            const schema = yup.object().shape({
                CPF: yup.string().required(),
                schemeId: yup.number().required(), 
                timeId: yup.array().required()
            });
        
        
            await schema.validate(req.body, {
                stripUnknown: true,
            });
            
            const [scheme, token]  = req.headers.authorization.split(" ");
            const { CPF, schemeId, timeId } = req.body;

            await secretaryValidation.isSecretary(token)

            const response = await SecretaryService.newRegistration(CPF, schemeId, timeId)
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(error.messages);
        }
    }
}