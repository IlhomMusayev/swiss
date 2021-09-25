const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('contacts')
})

module.exports = {
    path: '/contacts',
    router
}