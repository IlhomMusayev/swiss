const { checkToken } = require("../modules/jwt");

module.exports = async function AuthMiddleware (req, res, next) {
    try {
        const user = checkToken(req?.cookies?.token)
        if(user){
            req.user = user
        }
    }
    catch (e){
        console.log(e);
    }
    finally {
        next()
    }
}