const router = require('express').Router()
const AuthMiddleware = require('../middlewares/auth')
const { findUserByEmail } = require('../models/UserModel')
const { findAdminByEmail } = require('../models/AdminModel')

const moment = require('moment')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {

    let user = await findUserByEmail(req.user.email)
    if (!user) {
        adminUser = await findAdminByEmail(req.user.email)
        if (!adminUser) {
            return res.status(404).json({
                message: 'Пользователь не найден'   // не найден
            })
        }
        let date = moment(user.dateCreated).format('LL')
        res.render('account', {
            user: user, 
            date: date,
        })
        return;
    }
    let date = moment(user.dateCreated).format('LL')
    // convert time to the necessary format

    res.render('account', {
        user: user, 
        date: date,
    })
})


router.post('/', async (req, res) => {
    // console.log(req.body);
    res.redirect('/account')
})


module.exports = {
    path: '/account',
    router
}

