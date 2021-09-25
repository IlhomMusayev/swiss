const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('appointment')
})

module.exports = {
    path: '/appointment',
    router
}