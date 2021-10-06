const router = require('express').Router()
const cosmeticLanguages = require('../public/languages/cosmeticLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

router.get('/', async (req, res) => {
    res.render('cosmetic', {
        user: req.user,
        cosmeticLanguages,
        navbarLanguages,
        language: req.language
    })
})

module.exports = {
    path: '/cosmetic',
    router
}