const router = require('express').Router()
const contactLanguages = require('../public/languages/contactLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

router.get('/', async (req, res) => {
    res.render('contacts', {
        user: req.user,
        contactLanguages,
        navbarLanguages,
        language: "uz"

    })
})

module.exports = {
    path: '/contacts',
    router
}