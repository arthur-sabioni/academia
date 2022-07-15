const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { constants } = require("../utils");
const { messages } = require("../helpers");
const { userRepository } = require("../repositories");

module.exports = async (req, res, next) => {
  try {
    let token;

    if (req.headers && req.headers.authorization) {
      const [scheme, credentials] = req.headers.authorization.split(" ");

      if (scheme.match(/^Bearer$/i)) {
        token = credentials;
      } else {
        throw {
          status: StatusCodes.UNAUTHORIZED,
          message: messages.invalidAuthFormat,
        };
      }
    } else {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        message: messages.authMissing,
      };
    }

    const verify = promisify(jwt.verify);
    const decoded = await verify(token, constants.jwtToken);
    const cliente = await userRepository.getById(decoded.id);

    if (!cliente) {
      throw {
        status: StatusCodes.NOT_FOUND,
        message: messages.notFound("user"),
      };
    }

    req.session = { token, id: decoded.id };
    req.cliente = cliente;

    return next();
  } catch (error) {
    console.error(error);
    return res.status(error.status).json(error.message);
  }
};
