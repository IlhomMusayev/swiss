const router = require('express').Router();

const { findUserByEmail } = require('../models/UserModel')
router.get('/:id', async (req, res) => {
    const user = await findUserByEmail(req.user.email)
    const blogs = await allBlogs()
    res.render('index', {
        user: user,
        blogs,
        language: req.language
    })
})

module.exports = {
    path: 'blogs',
    router
}