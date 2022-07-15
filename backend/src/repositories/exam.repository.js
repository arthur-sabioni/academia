const { Exam } = require("../models")

module.exports = {
  list: (query) => Exam.findAndCountAll(query),
  getById: (id) => Exam.findByPk(id),
  get: (params) => Exam.findOne({ where: params }),
  create: (params) => Exam.create(params),
  update: (exam) => exam.save(),
  destroy: (id) => Exam.destroy({ where: { id } }),
};