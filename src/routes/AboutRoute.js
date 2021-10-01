const router = require('express').Router()
const aboutLanguages = require('../public/languages/aboutLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

router.get('/', async (req, res) => {
    res.render('about', {
        title: "About",
        user: req.user,
        aboutLanguages: aboutLanguages,
        navbarLanguages,
        language: "uz"
    })
})

module.exports = {
    path: '/about',
    router
}