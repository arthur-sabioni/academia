const { Exercise } = require("../models")

module.exports = {
  list: (query) => Exercise.findAndCountAll(query),
  getById: (id) => Exercise.findByPk(id),
  get: (params) => Exercise.findOne({ where: params }),
  create: (params) => Exercise.create(params),
  update: (exercise) => exercise.save(),
  destroy: (id) => Exercise.destroy({ where: { id } }),
};