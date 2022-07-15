const { Class } = require("../models")

module.exports = {
  list: (query) => Class.findAndCountAll(query),
  getById: (id) => Class.findByPk(id),
  get: (params) => Class.findOne({ where: params }),
  create: (params) => Class.create(params),
  update: (clas) => clas.save(),
  destroy: (id) => Class.destroy({ where: { id } }),
};