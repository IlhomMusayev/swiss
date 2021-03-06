const router = require('express').Router()
const Joi = require('joi')
const {
    findUserByEmail
} = require('../models/UserModel')
const {
    genereteToken
} = require('../modules/jwt')
const AuthMiddleware = require('../middlewares/userMiddleware')
const {
    compareCrypt
} = require('../modules/bcrypt')

const loginLanguages = require('../public/languages/loginLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const { allContacts } = require('../models/ContactsModel')


// router.use(AuthMiddleware)

const LoginValidation = Joi.object({
    login: Joi.string()
        .required()
        .email()
        .trim()
        .min(3)
        .max(40)
        .error(new Error("Электронная почта недействительна")),
    password: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(50)
        .error(new Error("Неправильный пароль")),
})

router.get('/', async (req, res) => {
    const contacts = await allContacts()
    res.render('login', {
        title: "Login",
        user: req.user,
        loginLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        contacts: contacts[0]
    })
})

router.post('/', async (req, res) => {
    const contacts = await allContacts()
    try {

        const {
            login: email,
            password
        } = await LoginValidation.validateAsync(req.body)

        const user = await findUserByEmail(email)
   
        const validPassword = await compareCrypt(password, user.password)

        if (!validPassword) throw new Error('Неправильный адрес электронной почты или пароль')

        const token = genereteToken({
            name: user.name,
            email: email,
            isAdmin: user.isAdmin
        })
        res.cookie('token', token).redirect('/')

    } catch (e) {
        res.render('login', {
            error: e + '',
            title: "Login",
            user: req.user,
            loginLanguages,
            navbarLanguages,
            footerLanguages,
            language: req.language.toString() == "uz" ? "uz" : "ru",
            contacts: contacts[0]
        })
    }
})

module.exports = {
    path: '/login',
    router
}