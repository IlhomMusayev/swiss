const router = require('express').Router()
const AuthMiddleware = require('../middlewares/authMiddleware')
const moment = require('moment')
const {
    allBlogs
} = require('../models/BlogModel')

const homeLanguages = require('../public/languages/homeLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    PhotosModel
} = require('../models/PhotosModel')
const {
    VideosModel
} = require('../models/VideoModel')
const {
    allContacts
} = require('../models/ContactsModel')
const {
    allDoctors,
    DoctorModel
} = require('../models/DoctorModel')

moment.locale('ru-Ru')

// router.use(AuthMiddleware)

router.get('/', async (req, res) => {

    const photosModel = await PhotosModel()
    const videoModel = await VideosModel()
    const contacts = await allContacts()
    const photos = await photosModel
        .find()
        .limit(5)
        .sort({
            dateCreated: -1
        })

    const videoItem = await videoModel.find().limit(1).sort({
        dateCreated: -1
    })


    const blogs = await allBlogs()

    res.render('index', {
        user: req.user,
        blogs,
        homeLanguages: homeLanguages.languages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        photos,
        videoItem,
        contacts: contacts[0]
    })
})

router.post('/appointmenthome', AuthMiddleware, async (req, res) => {
    const {
        full_name,
        phone_number
    } = req.body
    res.render('appointment', {
        user: {
            full_name,
            phone_number
        },
        navbarLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru"
    })
})

router.get('/alldoctorsusers', async (req, res) => {
    const doctorModel = await DoctorModel()
    const alldoctors = await allDoctors()
    const doctors = await doctorModel
        .find()
        .limit(alldoctors.length > 5 ? 5 : alldoctors.length)
        .sort({
            dateCreated: -1
        })
        
    console.log(doctors);
    res.json({
        doctors
    })
})



router.post('/editlanguage/:language', AuthMiddleware, async (req, res) => {
    console.log(req.params.language);
    res.cookie('language', req.params.language).redirect('/')
})





module.exports = {
    path: '/',
    router
}