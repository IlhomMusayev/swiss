const router = require('express').Router()
const Joi = require('joi')
const {
    findUserByEmail
} = require('../models/UserModel')
const {
    genereteToken
} = require('../modules/jwt')
const AuthMiddleware = require('../middlewares/auth')
const {
    compareCrypt
} = require('../modules/bcrypt')
const {
    findAdminByEmail
} = require('../models/AdminModel')


router.use(AuthMiddleware)

const LoginValidation = Joi.object({
    login: Joi.string()
        .required()
        .email()
        .trim()
        .min(3)
        .max(40)
        .error(new Error("Emailda xato bor")),
    password: Joi.string()
        .required()
        .trim()
        .min(4)
        .max(50)
        .error(new Error("Parolda xato bor")),
})

router.get('/', async (req, res) => {
    res.render('login')
})

router.post('/', async (req, res) => {
    try {
        const {
            login: email,
            password
        } = await LoginValidation.validateAsync(req.body)

        const user = await findUserByEmail(email)
        if (!user) {
            const admin = await findAdminByEmail(email)
            if (admin) {
                const validPassword = await compareCrypt(password, user.password)

                if (!validPassword) throw new Error('Invalid email or password')

                const token = genereteToken({
                    name: user.name,
                    email: email
                })
                res.cookie('token', token).redirect('/')
                return;
            }
        }

        const validPassword = await compareCrypt(password, user.password)

        if (!validPassword) throw new Error('Invalid email or password')

        const token = genereteToken({
            name: user.name,
            email: email
        })
        res.cookie('token', token).redirect('/')

    } catch (e) {
        res.render('login', {
            error: e + ''
        })
    }
})

module.exports = {
    path: '/login',
    router
}