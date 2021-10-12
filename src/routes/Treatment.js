const router = require('express').Router()
const treatmentLanguages = require('../public/languages/treatmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const { allTreatment } = require('../models/TreatmentPageModel')
const { allContacts } = require('../models/ContactsModel')

router.get('/', async (req, res) => {
    const allTreatments = await allTreatment()
    const contacts = await allContacts()
    res.render('treatment', {
        user: req.user,
        navbarLanguages,
        footerLanguages,
        treatmentLanguages,
        language: req.language,
        allTreatments: allTreatments[0],
        contacts: contacts[0]
    })
})


module.exports = {
    path: '/treatment',
    router
}

