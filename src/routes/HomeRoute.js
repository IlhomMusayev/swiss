const router = require('express').Router()
const AuthMiddleware = require('../middlewares/auth')
const { findUserByEmail } = require('../models/UserModel')
const moment = require('moment')
moment.locale('ru-Ru')

router.use(AuthMiddleware)

router.get('/', async (req, res) => {
    res.render('index', {
        user: req.user
    })
})



module.exports = {
    path: '/',
    router
}

