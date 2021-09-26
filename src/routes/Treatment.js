const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('treatment', {
        user: req.user

    })
})


module.exports = {
    path: '/treatment',
    router
}

