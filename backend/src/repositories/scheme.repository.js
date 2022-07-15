const { Scheme } = require("../models")

module.exports = {
  list: (query) => Scheme.findAndCountAll(query),
  getById: (id) => Scheme.findByPk(id),
  get: (params) => Scheme.findOne({ where: params }),
  getAll: () => Scheme.findAll(),
  create: (params) => Scheme.create(params),
  update: (scheme) => scheme.save(),
  destroy: (id) => Scheme.destroy({ where: { id } }),
};