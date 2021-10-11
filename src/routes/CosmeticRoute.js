const router = require('express').Router()
const cosmeticLanguages = require('../public/languages/cosmeticLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const { allCosmetic } = require('../models/CosmeticPageModel')

router.get('/', async (req, res) => {
    const allCosmetics = await allCosmetic()
    res.render('cosmetic', {
        user: req.user,
        cosmeticLanguages,
        navbarLanguages,
        language: req.language,
        allCosmetics: allCosmetics[0]
    })
})

module.exports = {
    path: '/cosmetic',
    router
}