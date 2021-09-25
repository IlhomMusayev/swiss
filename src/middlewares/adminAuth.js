const { checkToken } = require("../modules/jwt");
const {
    findAdminByEmail
} = require('../models/AdminModel')


module.exports = async function AdminAuthMiddleware (req, res, next) {
    const user = checkToken(req?.cookies?.token)
    const admin = await findAdminByEmail(user.email)
    
    if(admin) {
        req.admin = admin
        next()
    }
    res.redirect('/')
    
}