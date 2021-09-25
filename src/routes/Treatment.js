const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('treatment')
})


module.exports = {
    path: '/treatment',
    router
}

