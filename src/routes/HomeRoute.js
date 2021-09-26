const router = require('express').Router()
const AuthMiddleware = require('../middlewares/auth')
const { findUserByEmail } = require('../models/UserModel')
const moment = require('moment')
const { allBlogs } = require('../models/BlogModel')
const { addAppointmentModel } = require('../models/AppointmentModel')
moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {
    const user = await findUserByEmail(req.user.email)
    const blogs = await allBlogs()
    res.render('index', {
        user: user,
        blogs
    })
})

router.post('/addappointment', async (req, res) => {

})





module.exports = {
    path: '/',
    router
}

