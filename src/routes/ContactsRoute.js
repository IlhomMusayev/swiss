const router = require('express').Router()
const contactLanguages = require('../public/languages/contactLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    allContacts,
} = require('../models/ContactsModel')
const {
    allFilials
} = require('../models/FilialsModel')


router.get('/', async (req, res) => {
    const contacts = await allContacts()
    const filials = await allFilials()
    res.render('contacts', {
        user: req.user,
        contactLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        contacts: contacts[0],
        filials
    })
})

module.exports = {
    path: '/contacts',
    router
}