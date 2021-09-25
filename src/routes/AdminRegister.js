const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('about')
})

module.exports = {
    path: '/about',
    router
}