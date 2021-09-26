const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('about', {
        title: "About",
        user: req.user
    })
})

module.exports = {
    path: '/about',
    router
}