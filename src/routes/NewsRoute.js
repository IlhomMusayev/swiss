const router = require('express').Router();

const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const newsLanguages = require('../public/languages/newsLanguages.json')
const { findUserByEmail } = require('../models/UserModel')
const { allContacts } = require('../models/ContactsModel')
const { findBlogById, allBlogs } = require('../models/BlogModel')


router.get('/:id', async (req, res) => {
    try {
        const contacts = await allContacts()
        const newItem = await findBlogById(req.params.id)
        res.render('news', {
            user: req.user,
            navbarLanguages,
            footerLanguages,
            newsLanguages,
            language: req.language.toString() == "uz" ? "uz" : "ru",
            newItem,
            contacts: contacts[0]
        })
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
})

module.exports = {
    path: '/news',
    router
}