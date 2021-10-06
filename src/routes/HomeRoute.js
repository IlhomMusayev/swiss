const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const moment = require('moment')
const {
    allBlogs
} = require('../models/BlogModel')

const homeLanguages = require('../public/languages/homeLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {
    const blogs = await allBlogs()
    console.log(req.cookies.language);

    res.render('index', {
        user: req.user,
        blogs,
        homeLanguages: homeLanguages.languages,
        navbarLanguages,
        language: req.language.toString()
    })
})

router.post('/appointment', AuthMiddleware, async (req, res) => {
    const {
        full_name,
        phone_number
    } = req.body
    res.render('appointment', {
        user: {
            full_name,
            phone_number
        },
        navbarLanguages,
        language: "uz"
    })
})





module.exports = {
    path: '/',
    router
}