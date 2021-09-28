const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const { findUserByEmail } = require('../models/UserModel')
const moment = require('moment')
const { allBlogs } = require('../models/BlogModel')
const { allAppointmentModel, addAppointmentModel } = require('../models/Appointment')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {
    const blogs = await allBlogs()
    res.render('index', {
        user: req.user,
        blogs
    })
})

router.post('/', AuthMiddleware, async (req, res) => {
    console.log(req.body)
    const { full_name, phone_number } = req.body
    const blogs = await allBlogs()
    console.log(full_name, phone_number);

    if(!(full_name && phone_number)){
        res.render('index', {
            error: 'Please enter a full name or phone number',
            user: req.user,
            blogs
        })
    }
    const addAppointment = await addAppointmentModel(full_name, phone_number)
    if(addAppointment){
        res.json({
            success: 'ok',
            body: req.body,
        })
    }

})





module.exports = {
    path: '/',
    router
}

