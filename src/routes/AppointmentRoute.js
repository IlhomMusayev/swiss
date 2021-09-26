const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('appointment', {
        user: req.user
    })
})

module.exports = {
    path: '/appointment',
    router
}