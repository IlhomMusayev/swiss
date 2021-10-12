const router = require('express').Router();

const { findUserByEmail } = require('../models/UserModel')
const { allContacts } = require('../models/ContactsModel')


router.get('/:id', async (req, res) => {
    const contacts = await allContacts()
    const user = await findUserByEmail(req.user.email)
    const blogs = await allBlogs()
    res.render('index', {
        user: user,
        blogs,
        language: req.language,
        contacts: contacts[0]

    })
})

module.exports = {
    path: 'blogs',
    router
}