const router = require('express').Router()
const aboutLanguages = require('../public/languages/aboutLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    allAbout,
} = require('../models/AboutModel')
const { allPhotos } = require('../models/PhotosModel')
const { allVideos } = require('../models/VideoModel')
const { allBlogs } = require('../models/BlogModel')
const { allContacts } = require('../models/ContactsModel')


router.get('/', async (req, res) => {
    const allAbouts = await allAbout()
    const allPhotoss = await allPhotos()
    const videos = await allVideos()
    const news = await allBlogs()
    const contacts = await allContacts()

    res.render('about', {
        title: "About",
        user: req.user,
        aboutLanguages: aboutLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        allAbouts: allAbouts[0],
        photos: allPhotoss,
        videos,
        news,
        contacts: contacts[0]
    })
})

module.exports = {
    path: '/about',
    router
}