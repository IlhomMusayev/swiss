const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('contacts', {
        user: req.user

    })
})

module.exports = {
    path: '/contacts',
    router
}