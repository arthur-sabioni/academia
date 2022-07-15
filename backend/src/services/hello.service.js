const { StatusCodes } = require("http-status-codes");

const { messages } = require("../helpers");

module.exports.hello = async (option) => {
    return "Hello World"
}