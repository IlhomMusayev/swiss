const router = require('express').Router()
const {
    allAppointmentModel,
    addAppointmentModel
} = require('../models/Appointment')
const appointmentLanguages = require('../public/languages/appointmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

router.get('/', async (req, res) => {
    res.render('appointment', {
        user: req.user,
        appointmentLanguages,
        navbarLanguages,
        language: req.language
    })
})
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const {
            full_name,
            phone_number,
            service_label,
            service_include_label
        } = req.body

        if (!(full_name && phone_number && service_label && service_include_label)) {
            res.json({
                status: 'error',
                error: 'Please fill all the fields'
            })
            return;
        }

        const addAppointment = await addAppointmentModel(full_name, phone_number, service_label, service_include_label)
        if (addAppointment) {
            res.json({
                status: 'ok',
            })
        }

    } catch (error) {
        res.json({
            status: 'error',
            error: error.message
        })
    }
})

module.exports = {
    path: '/appointment',
    router
}