const { checkToken } = require("../modules/jwt");
const {
    findUserByEmail
} = require('../models/UserModel')


module.exports = async function AdminAuthMiddleware (req, res, next) {
    const token = await checkToken(req?.cookies?.token)
    if (token) {
        res.redirect('/')
    }
    next()
}