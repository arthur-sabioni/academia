const { Training } = require("../models")

module.exports = {
  list: (query) => Training.findAndCountAll(query),
  getById: (id) => Training.findByPk(id),
  get: (params) => Training.findOne({ where: params }),
  create: (params) => Training.create(params),
  update: (training) => training.save(),
  destroy: (id) => Training.destroy({ where: { id } }),
};