const router = require('express').Router()
const aboutLanguages = require('../public/languages/aboutLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const {
    allAbout,
} = require('../models/AboutModel')
const { allPhotos } = require('../models/PhotosModel')
const { allVideos } = require('../models/VideoModel')
const { allBlogs } = require('../models/BlogModel')

router.get('/', async (req, res) => {
    const allAbouts = await allAbout()
    const allPhotoss = await allPhotos()
    const videos = await allVideos()
    const news = await allBlogs()
    console.log(news);
    res.render('about', {
        title: "About",
        user: req.user,
        aboutLanguages: aboutLanguages,
        navbarLanguages,
        language: req.language,
        allAbouts: allAbouts[0],
        photos: allPhotoss,
        videos,
        news
    })
})

module.exports = {
    path: '/about',
    router
}