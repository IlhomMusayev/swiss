const router = require('express').Router()
const {
    allAppointmentModel,
    addAppointmentModel
} = require('../models/Appointment')
const appointmentLanguages = require('../public/languages/appointmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const AuthMiddleware = require('../middlewares/authMiddleware')
const { allContacts } = require('../models/ContactsModel')
const {
    CategoryModel,
    allCategorys,
} = require('../models/CategorysModel')






router.get('/', async (req, res) => {
    const contacts = await allContacts()
    const categorys = await allCategorys()
    res.render('appointment', {
        user: req.user,
        appointmentLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        contacts: contacts[0],
        categorys
    })
})
router.post('/', AuthMiddleware, async (req, res) => {
    const contacts = await allContacts()
    const categorys = await allCategorys()
    try {
        let {
            full_name,
            phone_number,
            filial,
            service__label,
        } = req.body
        const email = req.user.email

        if (!(full_name && phone_number && filial)) {
            res.render('appointment', {
                status: 'error',
                error: 'Iltimos bo\'shliqlarni o\'ldiring',
                user: req.user,
                appointmentLanguages,
                navbarLanguages,
                footerLanguages,
                language: req.language.toString() == "uz" ? "uz" : "ru",
                contacts: contacts[0],
                categorys
            })
            return;
        }


        if (typeof (service__label) === "object") {
            service__label = service__label.join(", ")
        }


        const addAppointment = await addAppointmentModel(full_name, phone_number, filial, service__label, email)
        if (addAppointment) {
            res.render('appointment', {
                status: 'ok',
                user: req.user,
                appointmentLanguages,
                navbarLanguages,
                footerLanguages,
                language: req.language.toString() == "uz" ? "uz" : "ru",
                contacts: contacts[0],
                categorys
            })
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = {
    path: '/appointment',
    router
}