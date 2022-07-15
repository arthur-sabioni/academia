const adminValidations = require("./isAdm.validations")
const clientValidation = require("./isClient.validation")
const doctorValidation = require("./isDoctor.validation")
const secretaryValidation = require("./isSecretary.validation")
const teacherValidation = require("./isTeacher.validation")

module.exports = {
    adminValidations,
    clientValidation,
    doctorValidation,
    secretaryValidation,
    teacherValidation,
}