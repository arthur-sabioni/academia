const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const { encryptor, messages } = require("../helpers");
const { constants } = require("../utils");
const { userRepository } = require("../repositories");
const { promisify } = require("util");

module.exports.isAdmin = async (token) => {
    const verify = promisify(jwt.verify);
    const logged_user = await verify(token, constants.jwtToken);
    
    const user = await userRepository.getById( logged_user.id )

    if (!user) {
        throw {
            status: StatusCodes.NOT_FOUND,
            message: messages.notFound("user"),
        };
    }

    if(!user.type == "adm") {
        throw {
            status: StatusCodes.NOT_ACCEPTABLE,
            message: messages.authMissing,
        };
    }
}