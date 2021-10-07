const router = require('express').Router()
const {
    allAppointmentModel,
    addAppointmentModel
} = require('../models/Appointment')
const appointmentLanguages = require('../public/languages/appointmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const AuthMiddleware = require('../middlewares/authMiddleware')




router.get('/', async (req, res) => {
    res.render('appointment', {
        user: req.user,
        appointmentLanguages,
        navbarLanguages,
        language: req.language
    })
})
router.post('/', AuthMiddleware, async (req, res) => {
    
    try {
        let {
            full_name,
            phone_number,
            filial,
            service__label,
            service__includes__label   
        } = req.body
        const email = req.user.email
        
        if (!(full_name && phone_number && filial)) {
            res.render('appointment', {
                status: 'error',
                error: 'Iltimos bo\'shliqlarni o\'ldiring',
                navbarLanguages,
                appointmentLanguages,
                language: req.language
            })
            return;
        }        


        if(typeof(service__label) === "object"){
            service__label = service__label.join(", ")
        }
        if(typeof(service__includes__label) === "object"){
            service__includes__label = service__includes__label.join(", ")
        }


        const addAppointment = await addAppointmentModel(full_name, phone_number, filial, service__label, service__includes__label, email)
        if (addAppointment) {
            res.render('appointment', {
                status: 'ok',
                navbarLanguages,
                appointmentLanguages,
                language: req.language
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