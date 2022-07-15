const { Capacity } = require("../models")

module.exports = {
  list: (query) => Capacity.findAndCountAll(query),
  getById: (id) => Capacity.findByPk(id),
  get: (params) => Capacity.findOne({ where: params }),
  create: (params) => Capacity.create(params),
  update: (capacity) => capacity.save(),
  destroy: (id) => Capacity.destroy({ where: { id } }),
};