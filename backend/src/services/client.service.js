const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../helpers");
const { constants } = require("../utils");
const { examRepository, registrationRepository, classRepository, trainingRepository, exerciseRepository } = require("../repositories");
const { promisify } = require("util");
const { Op } = require("sequelize");
const { cls } = require("sequelize");

function groupBy (array, key) {
	return array.reduce((acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
  {})
}

module.exports = {
    getExam: async (clientCPF) => {
        const exam = await examRepository.get({ CPF: clientCPF })

        if(!exam){
            throw{
                status: StatusCodes.notFound,
                message: messages.notFound("exam"),
            };
        }

        return exam
    },

    getRegistrations: async (clientId) => {
        const registrations = await registrationRepository.list({ where: { userId: clientId }})

        if(!registrations){
            throw{
                status: StatusCodes.notFound,
                message: messages.notFound("registrations"),
            };
        }
        let cls = []
        for (const rg of registrations['rows']) {
            const classes = await classRepository.list({ where: { id: { [Op.or]: rg['timeId'] }}})
            cls = cls.concat(classes['rows'])
        }


        return groupBy(cls, 'modality')
    },

    getTraining: async (clientId) => {
        const registration = await registrationRepository.get({ [Op.and]: [{userId: clientId}, { schemeId: {[Op.or]: [7,8,9]}}]})

        if(!registration){
            throw{
                status: StatusCodes.notFound,
                message: messages.notFound("registration"),
            };
        }
        
        const training = await trainingRepository.list({ where: { registrationId: registration.id }})

        if(!training){
            throw{
                status: StatusCodes.notFound,
                message: messages.notFound("training"),
            };
        }

        trn = []
        for (const t of training['rows']) {
            const e = await exerciseRepository.get({ id: t.exerciseId})
            trn.push({
                groupMuscle: e.groupMuscle,
                exercise: e.exercise,
                repetitions: t.repetitions,
                card: t.card
            })
        }

        return groupBy(trn, 'groupMuscle')
    }
}