const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const { findUserByEmail } = require('../models/UserModel')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const accountLanguages = require('../public/languages/accountLanguages.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    findAppointmentByEmail,
    deleteOneAppointmentById
} = require('../models/Appointment')
const { allContacts } = require('../models/ContactsModel')

const moment = require('moment')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', AuthMiddleware, async (req, res) => {
        
    let user = await findUserByEmail(req.user.email)
    let myAppoinments = await findAppointmentByEmail(req.user.email)
    // convert time to the necessary format
    let date = moment(user.dateCreated).format('LL')
    const contacts = await allContacts()
    
    res.render('account', { 
        user: user, 
        date: date,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        navbarLanguages,
        footerLanguages,
        accountLanguages,
        myAppoinments,
        contacts: contacts[0]

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

