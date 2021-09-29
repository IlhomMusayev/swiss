const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const moment = require('moment')
const {
    allBlogs
} = require('../models/BlogModel')

const homeLanguages = require('../public/languages/homeLanguages.json')

moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {
    const blogs = await allBlogs()
    res.render('index', {
        user: req.user,
        blogs,
        homeLanguages: homeLanguages.languages,
        language: "uz"
    })
})

router.post('/', AuthMiddleware, async (req, res) => {
    const {
        full_name,
        phone_number
    } = req.body
    res.render('appointment', {
        user: {
            full_name,
            phone_number
        },
    })
})





module.exports = {
    path: '/',
    router
}