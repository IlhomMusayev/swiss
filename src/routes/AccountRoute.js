const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const { findUserByEmail } = require('../models/UserModel')

const moment = require('moment')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', AuthMiddleware, async (req, res) => {
        
    let user = await findUserByEmail(req.user.email)
    
    // convert time to the necessary format
    let date = moment(user.dateCreated).format('LL')

    res.render('account', {
        user: user, 
        date: date,
        language: req.language
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

