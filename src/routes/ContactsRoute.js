const router = require('express').Router()
const contactLanguages = require('../public/languages/contactLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    allContacts,
} = require('../models/ContactsModel')

router.get('/', async (req, res) => {
    const contacts = await allContacts()
    
    res.render('contacts', {
        user: req.user,
        contactLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language,
        contacts: contacts[0]
    })
})

module.exports = {
    path: '/contacts',
    router
}