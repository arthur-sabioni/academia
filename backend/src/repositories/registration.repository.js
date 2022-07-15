const { Registration } = require("../models")

module.exports = {
  list: (query) => Registration.findAndCountAll(query),
  getById: (id) => Registration.findByPk(id),
  get: (params) => Registration.findOne({ where: params }),
  create: (params) => Registration.create(params),
  update: (registration) => registration.save(),
  destroy: (id) => Registration.destroy({ where: { id } }),
};