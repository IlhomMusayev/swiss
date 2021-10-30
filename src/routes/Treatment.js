const router = require('express').Router()
const treatmentLanguages = require('../public/languages/treatmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const { allTreatment } = require('../models/TreatmentPageModel')
const { allContacts } = require('../models/ContactsModel')
const {
    allCategorys,
} = require('../models/CategorysModel')

router.get('/', async (req, res) => {
    const allTreatments = await allTreatment()
    const contacts = await allContacts()
    const categorys = await allCategorys()
    res.render('treatment', {
        user: req.user,
        navbarLanguages,
        footerLanguages,
        treatmentLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        allTreatments: allTreatments[0],
        contacts: contacts[0],
        categorys
    })
})

module.exports = {
    path: '/treatment',
    router
}

