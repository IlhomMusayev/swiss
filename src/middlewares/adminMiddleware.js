const {
    checkToken
} = require("../modules/jwt");
const {
    findUserByEmail
} = require('../models/UserModel')


module.exports = async function AdminAuthMiddleware(req, res, next) {
    const user = await findUserByEmail(req.user.email)
    if (user.isAdmin) {
        next()
    }else{
        res.redirect('/')
    }

}