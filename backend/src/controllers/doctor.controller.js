const { StatusCodes } = require("http-status-codes")
const { DoctorService } = require("../services")
const { doctorValidation } = require("../validations")
const yup = require("yup");

module.exports = {
    newExam: async (req, res) => {
        try {
            const schema = yup.object().shape({
                CPF: yup.string().required(),
                weight: yup.number().required(), 
                height: yup.number().required(), 
                pressure: yup.string().required(), 
                fat: yup.number().required(), 
                leanMass: yup.number().required(), 
                IMC: yup.number().required(), 
                able: yup.boolean().required(),
            });
        
            await schema.validate(req.body, {
                stripUnknown: true,
            });
            
            const [scheme, token]  = req.headers.authorization.split(" ");
            const { CPF, weight, height, pressure, fat, leanMass, IMC, able } = req.body;

            await doctorValidation.isDoctor(token)

            const response = await DoctorService.newExam(CPF, weight, height, pressure, fat, leanMass, IMC, able)
            return res.status(StatusCodes.OK).json(response);
        } catch (error) {
            console.log(error);
            return res
                .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
                .json(error.messages);
        }
    }
}