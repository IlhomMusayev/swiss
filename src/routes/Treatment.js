const router = require('express').Router()
const treatmentLanguages = require('../public/languages/treatmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const { allTreatment } = require('../models/TreatmentPageModel')

router.get('/', async (req, res) => {
    const allTreatments = await allTreatment()
    res.render('treatment', {
        user: req.user,
        navbarLanguages,
        treatmentLanguages,
        language: "uz",
        allTreatments: allTreatments[0]
    })
})


module.exports = {
    path: '/treatment',
    router
}

