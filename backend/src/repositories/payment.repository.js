const { Payment } = require("../models")

module.exports = {
  list: (query) => Payment.findAndCountAll(query),
  getById: (id) => Payment.findByPk(id),
  get: (params) => Payment.findOne({ where: params }),
  create: (params) => Payment.create(params),
  update: (payment) => payment.save(),
  destroy: (id) => Payment.destroy({ where: { id } }),
};