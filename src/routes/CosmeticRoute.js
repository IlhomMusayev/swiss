const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('cosmetic')
})

module.exports = {
    path: '/cosmetic',
    router
}