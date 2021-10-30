const router = require('express').Router()
const Joi = require('joi')
const {
    findUser,
    addUser,
    allUsers
} = require('../models/UserModel')
const {
    genereteCrypt
} = require('../modules/bcrypt')
const {
    genereteToken
} = require('../modules/jwt')

const registerLanguages = require('../public/languages/registerLanguages.json')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    allContacts
} = require('../models/ContactsModel')

const RegisterValidation = Joi.object({
    full_name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20)
        .error(new Error("Имя недействительно! ")),
    phone_number: Joi.number()
        .required()
        .min(998710000000)
        .max(1000000000000)
        .error(new Error("Номер недействителен")),
    email: Joi.string()
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
    let users = await allUsers()
    const contacts = await allContacts()

    res.render('register', {
        title: "Register",
        user: req.user,
        registerLanguages,
        navbarLanguages,
        footerLanguages,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        contacts: contacts[0]
    })
})

router.post('/', async (req, res) => {
    const contacts = await allContacts()
    try {
        // convert phone num to Numbers
        const Users = await allUsers()
        req.body.phone_number = Number(req.body.phone_number.replace(/\D/g, ''))
        const {
            phone_number,
            email,
            full_name,
            password
        } = await RegisterValidation.validateAsync(req.body)
        const token = genereteToken({
            name: full_name,
            email: email
        })
        if (Users.length == 0) {
            await addUser(full_name, phone_number, email, genereteCrypt(password), true)
            res.cookie('token', token).redirect('/')
        } else {
            await addUser(full_name, phone_number, email, genereteCrypt(password), false)
            res.cookie('token', token).redirect('/')
        }
    } catch (e) {
        if (String(e).includes("duplicate key")) {
            e = "Электронная почта или телефон уже существует!"
        }
        res.render('register', {
            error: e + "",
            user: req.user,
            registerLanguages,
            navbarLanguages,
            footerLanguages,
            language: req.language.toString() == "uz" ? "uz" : "ru",
            contacts: contacts[0]
        })
    }
})

module.exports = {
    path: '/register',
    router
}