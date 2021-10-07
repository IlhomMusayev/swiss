const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const { findUserByEmail } = require('../models/UserModel')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const {
    findAppointmentByEmail,
    deleteOneAppointmentById
} = require('../models/Appointment')

const moment = require('moment')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', AuthMiddleware, async (req, res) => {
        
    let user = await findUserByEmail(req.user.email)
    let myAppoinments = await findAppointmentByEmail(req.user.email)
    console.log(myAppoinments);
    // convert time to the necessary format
    let date = moment(user.dateCreated).format('LL')

    res.render('account', { 
        user: user, 
        date: date,
        navbarLanguages,
        language: req.language,
        myAppoinments
    })
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteOneAppointmentById(req.params.id)
        
        if (deleteOne) {
            res.json({
                message: 'Blog deleted'
            })
        }
        
    } catch (error) {
        res.json({
            error: error
        })
    }
    
})


module.exports = {
    path: '/account',
    router
}

