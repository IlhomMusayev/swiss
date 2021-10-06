const {
    BlogModel,
    addBlog,
    allBlogs,
    findBlogById,
    updateOneBlogModel,
    deleteOneById,
} = require('../models/BlogModel')

const {
    AboutModel,
    allAbout,
    addAbout,
    updateAbout
} = require('../models/AboutModel')

const adminMiddleware = require('../middlewares/adminMiddleware')
const expressFileUpload = require('express-fileupload');
const path = require('path');
const router = require('express').Router()
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId
const {
    AppointmentModel,
    allAppointmentModel
} = require('../models/Appointment')



router.use(adminMiddleware)


router.get('/', async (req, res) => {
    const skipblog = req.query.skipblog * 1 || 0;
    const BlogModele = await BlogModel()
    const allblogs = await allBlogs()
    const allBlogsPog = await BlogModele
        .find()
        .skip(skipblog * 10)
        .limit(10)
    const allBlogsCount = await allblogs.length


    // 
    const skipappontment = req.query.skipappontment * 1 || 0;

    const AppointmentModels = await AppointmentModel()
    const allAppointments = await allAppointmentModel()
    const allAppointmentPog = await AppointmentModels
        .find()
        .skip(skipblog * 10)
        .limit(10)
        .sort({
            dateCreated: -1
        })
    const allAppointmentCount = await allAppointments.length



    res.render('admin', {
        skipblog,
        allBlogsPog,
        allBlogsCount,
        skipappontment,
        allAppointmentPog,
        allAppointmentCount
    })
})

router.get('/addblog', async (req, res) => {
    res.render('addblog')
})

router.get('/about', async (req, res) => {
    const allAbouts = await allAbout()
    res.render('adminAbout',
    {
        allAbouts : allAbouts[0],
    })
})

router.post('/about', expressFileUpload(), async (req, res) => {
    try {
        const allAbouts = await allAbout()
        const {
            title_uz,
            title_ru,
            content_uz,
            content_ru,
            id
        } = req.body
        console.log(id);

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(title_uz || title_ru || content_uz || content_ru)) {
            throw new Error('Title yoki Blog kiritmadingiz!')
        }

        if(allAbouts.length <= 0){
            await addAbout(title_uz, title_ru, content_uz, content_ru, filename)
            req.files.image.mv(
                path.join(__dirname, '..', 'public', 'files', filename),
            )
            res.redirect('/about')
        }
        await updateAbout(title_uz, title_ru, content_uz, content_ru, filename, id.trim())
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        res.redirect('/about')
    } catch (error) {
        console.log(error);

    }
})

router.post('/addblog', expressFileUpload(), async (req, res) => {
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

        const blog = addBlog(title, content, filename)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        res.render('addblog', {
            message: "Muvoffaqiyatli qo'shildi!"
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


router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteOneById(req.params.id)

        if (deleteOne) {
            res.json({
                message: 'Blog deleted'
            })
        }

    } catch (error) {
        res.json({
            error: error
        })
    }

})

module.exports = {
    path: '/admin',
    router
}