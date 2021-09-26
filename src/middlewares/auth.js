const { checkToken } = require("../modules/jwt");
const { findUserByEmail } = require('../m')

module.exports = async function AuthMiddleware (req, res, next) {
    try {
        const data = checkToken(req?.cookies?.token)
        const user = await findUserByEmail
        if(user){
            req.user = user
            next()
        }
    }
    catch (e){
        console.log(e);
    }
}