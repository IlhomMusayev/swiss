const router = require('express').Router()
const cosmeticLanguages = require('../public/languages/cosmeticLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const { allCosmetic } = require('../models/CosmeticPageModel')
const { allContacts } = require('../models/ContactsModel')


router.get('/', async (req, res) => {
    const allCosmetics = await allCosmetic()
    const contacts = await allContacts()
    
    res.render('cosmetic', {
        user: req.user,
        cosmeticLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language,
        allCosmetics: allCosmetics[0],
        contacts: contacts[0]
    })
})

module.exports = {
    path: '/cosmetic',
    router
}