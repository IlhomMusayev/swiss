const {
    addBlog,
    allBlogs,
    findBlogById,
    updateOneBlogModel,
    deleteOneById,
} = require('../models/BlogModel')
const AdminAuthMiddleware = require('../middlewares/adminAuth')
const { addUser, allUsers } = require('../models/AdminModel')

const expressFileUpload = require('express-fileupload');
const path = require('path');
const router = require('express').Router()
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId


const Joi = require('joi')
const { genereteCrypt } = require('../modules/bcrypt')
const { genereteToken } = require('../modules/jwt')

router.use(AdminAuthMiddleware)

const RegisterValidation = Joi.object({
    full_name: Joi.string()
        .required()
        .trim()
        .min(3)
        .max(20)
        .error(new Error("Ismda xato bor")),
    phone_number: Joi.number()
        .required()
        .min(998710000000)
        .max(1000000000000)
        .error(new Error("Raqamda error")),
    email: Joi.string()
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
    const courses = await allBlogs()
    console.log(courses);
    res.render('admin', {
        courses
    })
})

router.get('/register', async (req, res) => {
    const admins = await allUsers()
    if (admins.length > 0) {
        res.redirect('/')
    }
    res.render('adminRegister')
})

router.post('/register', async (req, res) => {
    const admins = await allUsers()
    if(admins.length == 0){
        try {
            // convert phone num to Numbers
            req.body.phone_number = Number(req.body.phone_number.replace(/\D/g,''))
            const { phone_number, email, full_name, password} = await RegisterValidation.validateAsync(req.body)
            const user = await addUser(full_name, phone_number, email, genereteCrypt(password))
            const token = genereteToken({ name: full_name, email: email })
            res.cookie('token', token).redirect('/')
        }
        catch (e){
            if(String(e).includes("duplicate key")){
                e = "Email or Phone already exists"
            }
            res.render('register', {
                error: e + ""
            })
        }
    }
    res.redirect('/')
})


router.post('/add', expressFileUpload(), async (req, res) => {
    try {
        const {
            title,
            content
        } = req.body

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(title || content)) {
            throw new Error('Title yoki Blog kiritmadingiz!')
        }

        const courses = addBlog(title, content, filename)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        res.render('admin', {
            succes: "Muvoffaqiyatli qo'shildi..."
        })

    } catch (error) {
        console.log(error);
    }
})

router.get('/edite/:id', async (req, res) => {
    try {
        const blogItem = await findBlogById(new ObjectId(req.params.id))
        if (!blogItem) {
            res.render('admin', {
                title: 'Admin panel',
                error: "Bunday blog mavjud emas"
            })
        }
        res.render('editblog', {
            title: blogItem.title,
            blogItem
        })
    } catch (error) {
        console.log(error);
    }
})

router.post('/edite', expressFileUpload(), async (req, res) => {
    try {
        const {
            title,
            content,
            id
        } = req.body

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        const blogItem = await findBlogById(id)
        try {
            fs.unlinkSync(path.join(__dirname, 'public', 'file', blogItem.filename))
        } catch (error) {
            console.log(error);
        }

        const updateOneBlog = await updateOneBlogModel(title, content, filename, id)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        // delete img file for id in express app

        res.redirect('/admin')
    } catch (error) {
        console.log(error);
    }
})


router.get('/delete/:id', async (req, res) => {
    const blogItem = await findBlogById(req.params.id)
    if (!blogItem) {
        res.render('admin', {
            title: 'Admin panel',
            error: "Bunday blog mavjud emas 1"
        })
        return;
    }
    
    const deleteOne = await deleteOneById(req.params.id)
    res.redirect('/admin')

})

module.exports = {
    path: '/admin',
    router
}