const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('cosmetic', {
        user: req.user
    })
})

module.exports = {
    path: '/cosmetic',
    router
}