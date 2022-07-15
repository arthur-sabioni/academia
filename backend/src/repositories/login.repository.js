const { Login } = require("../models")

module.exports = {
  list: (query) => Login.findAndCountAll(query),
  getById: (id) => Login.findByPk(id),
  get: (params) => Login.findOne({ where: params }),
  create: (params) => Login.create(params),
  update: (login) => login.save(),
  destroy: (id) => Login.destroy({ where: { id } }),
};