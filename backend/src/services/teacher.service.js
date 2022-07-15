const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../helpers");
const { constants } = require("../utils");
const { exerciseRepository, userRepository, registrationRepository, trainingRepository } = require("../repositories");
const { promisify } = require("util");

module.exports = {
    getExercises: async () => {
        const exercises = await exerciseRepository.list()
        
        if(!exercises){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("exercises"),
            };
        }

        return exercises["rows"]
    },

    newTraining: async (CPF, exercises) => {
        const user = await userRepository.get({ CPF })
        if(!user){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("user"),
            };
        }

        console.log("User found!")

        const registration = await registrationRepository.get({ id: user.id })

        if(!registration || !registration.timeId.includes(91)){
            throw{
                status: StatusCodes.NOT_FOUND,
                message: messages.notFound("registration"),
            };
        }

        console.log("Registration found!")

        const training = await trainingRepository.list({ where: { registrationId: registration.id }})

        if(training){
            for (const tr of training['rows']) {
                await trainingRepository.destroy(tr.id)
            }
        }

        for (const e of exercises) {
            const tr = {
                registrationId: registration.id,
                exerciseId: e.exerciseId,
                repetitions: e.repetitions,
                card: e.card,
                createdAt: new Date(),
                updatedAt: new Date(),
            }

            await trainingRepository.create(tr)
        }
    }
}