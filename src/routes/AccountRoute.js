const router = require('express').Router()
const Joi = require('joi')
const AuthMiddleware = require('../middlewares/authMiddleware')
const { findUserByEmail, editUser } = require('../models/UserModel')
const navbarLanguages = require('../public/languages/navbarLanguage.json')
const accountLanguages = require('../public/languages/accountLanguages.json')
const footerLanguages = require('../public/languages/footerLanguage.json')
const {
    findAppointmentByEmail,
    deleteOneAppointmentById
} = require('../models/Appointment')
const { allContacts } = require('../models/ContactsModel')
const {
    compareCrypt,
    genereteCrypt
} = require('../modules/bcrypt')

const moment = require('moment')
moment.locale('ru-Ru')



const UpdateValidation = Joi.object({
    name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(40)
        .error(new Error("Имя недействительна")),
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
    new_password: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(50)
        .error(new Error("Неправильный пароль")),
})


// router.use(AuthMiddleware)

router.get('/', AuthMiddleware, async (req, res) => {
        
    let user = await findUserByEmail(req.user.email)
    let myAppoinments = await findAppointmentByEmail(req.user.email)
    // convert time to the necessary format
    let date = moment(user.dateCreated).format('LL')
    const contacts = await allContacts()
    
    res.render('account', { 
        user: user, 
        date: date,
        language: req.language.toString() == "uz" ? "uz" : "ru",
        navbarLanguages,
        footerLanguages,
        accountLanguages,
        myAppoinments,
        contacts: contacts[0]

    })
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteOneAppointmentById(req.params.id)
        
        if (deleteOne) {
            res.json({
                message: req.language === 'uz' ? "Учрашувингиз бекор қилинди" : "Ваша встреча была отменена"
            })
        }
        
    } catch (error) {
        res.json({
            error: error
        })
    }
    
})


router.post('/', AuthMiddleware, async (req, res) => {
    let user = await findUserByEmail(req.user.email)
    let myAppoinments = await findAppointmentByEmail(req.user.email)
    // convert time to the necessary format
    let date = moment(user.dateCreated).format('LL')
    const contacts = await allContacts()
    try {
        const { name, email, password, new_password } = req.body
        console.log(req.body);
        if(!(name && password && new_password && email)){
            throw new Error(req.language === 'uz' ? "Хамма майдонларни тулдиринг" : "Заполните все поля")
        }

        const userOne = await findUserByEmail(email)

        if(!(userOne)){
            throw new Error(req.language === 'uz' ? "Фойдаланувчи топилмади" : "Пользователь не найден")
        }
    
        const validPassword = await compareCrypt(password, user.password)

        if(!(validPassword)){
            throw new Error(req.language === 'uz' ? "Пароль нотўғри киритилган" : "Пароль введен неправильно")
        }

        const users = await editUser(email, name, genereteCrypt(new_password))

        if(users){
            res.render('account', {
                user: user, 
                date: date,
                language: req.language.toString() == "uz" ? "uz" : "ru",
                navbarLanguages,
                footerLanguages,
                accountLanguages,
                myAppoinments,
                contacts: contacts[0],
                message: req.language === 'uz' ? "Маълумотлар ўзгартирилди" : "Данные изменены"
            })
        }
    } catch (error) {
        console.log(error);
        res.render('account', {
            error: error + "",
            user: user, 
            date: date,
            language: req.language.toString() == "uz" ? "uz" : "ru",
            navbarLanguages,
            footerLanguages,
            accountLanguages,
            myAppoinments,
            contacts: contacts[0],
        })
    }
})


module.exports = {
    path: '/account',
    router
}

