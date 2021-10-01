const router = require('express').Router()
const treatmentLanguages = require('../public/languages/treatmentLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')

router.get('/', async (req, res) => {
    res.render('treatment', {
        user: req.user,
        navbarLanguages,
        treatmentLanguages,
        language: "uz"
    })
})


module.exports = {
    path: '/treatment',
    router
}

