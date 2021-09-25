const {
    addBlog,
    allBlogs,
    findBlogById,
    updateOneBlogModel,
    deleteOneById,
} = require('../models/BlogModel')

const expressFileUpload = require('express-fileupload');
const path = require('path');
const router = require('express').Router()
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId



router.get('/', async (req, res) => {
    const courses = await allBlogs()
    console.log(courses);
    res.render('admin', {
        courses
    })
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