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

const {
    allPhotos,
    addPhoto,
    deleteOnePhotoById
} = require('../models/PhotosModel')
const {
    allVideos,
    addVideo,
    deleteOneVideoById
} = require('../models/VideoModel')

const {
    DoctorModel,
    addDoctor,
    allDoctors,
    updateDoctor,
    deleteDoctorById,
    findDoctorById
} = require('../models/DoctorModel')

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
 
    // 
    const skipappontment = req.query.skipappontment * 1 || 0;

    const AppointmentModels = await AppointmentModel()
    const allAppointments = await allAppointmentModel()
    const allAppointmentPog = await AppointmentModels
        .find()
        .skip(skipappontment * 10)
        .limit(10)
        .sort({
            dateCreated: -1
        })
    const allAppointmentCount = await allAppointments.length



    res.render('admin', {
        skipappontment,
        allAppointmentPog,
        allAppointmentCount
    })
})

// ABOUT
router.get('/about', async (req, res) => {
    const allAbouts = await allAbout()
    const allPhotoss = await allPhotos()
    const allVideoss = await allVideos()
    res.render('adminAbout', {
        allAbouts: allAbouts[0],
        photos: allPhotoss,
        videos: allVideoss
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

        if (allAbouts.length <= 0) {
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

// BLOG
router.get('/addblog', async (req, res) => {
    const skipblog = req.query.skipblog * 1 || 0;
    const BlogModele = await BlogModel()
    const allblogs = await allBlogs()
    const allBlogsPog = await BlogModele
        .find()
        .skip(skipblog * 10)
        .limit(10)
    const allBlogsCount = await allblogs.length
    
    res.render('addblog', {
        skipblog,
        allBlogsPog,
        allBlogsCount,
    })
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

// Photo galery
router.post('/addphotos', expressFileUpload(), async (req, res) => {
    const photos = req.files.photos
    console.log(photos);
    if (photos.length > 1) {
        for (let photo of photos) {
            const imgName = photo.name.split(".")
            const filename = photo.md5 + '.' + imgName[imgName.length - 1]
            photo.mv(
                path.join(__dirname, '..', 'public', 'photogalery', filename),
            )
            const addPhotos = await addPhoto(filename)
            res.redirect('/admin/about')
            return;
        }
    }
    const imgName = photos.name.split(".")
    const filename = photos.md5 + '.' + imgName[imgName.length - 1]
    photos.mv(
        path.join(__dirname, '..', 'public', 'photogalery', filename),
    )
    const addPhotos = await addPhoto(filename)
    res.redirect('/admin/about')

})
router.get('/deletephoto/:id', async (req, res) => {
    try {
        await deleteOnePhotoById(req.params.id)
        res.redirect('/admin/about')
    } catch (error) {
        console.log(error);
        res.redirect('/admin')
    }
})
// Video gaery routes
router.post('/addvideo', expressFileUpload(), async (req, res) => {
    try {
        const {
            video_link,
            caption
        } = req.body

        function getId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11) ?
                match[2] :
                null;
        }
        const id = getId(video_link)
        const videoLink = `https://youtube.com/embed/${id}`

        const imgName = req.files.videoimg.name.split(".")

        const filename = req.files.videoimg.md5 + '.' + imgName[imgName.length - 1]

        const addVideos = await addVideo(videoLink, caption, filename)
        req.files.videoimg.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        res.redirect('/admin/about')
    } catch (error) {
        console.log(error);
    }
})
router.get('/deletevideo/:id', async (req, res) => {
    try {
        await deleteOneVideoById(req.params.id)
        res.redirect('/admin/about')
    } catch (error) {
        console.log(error);
        res.redirect('/admin')
    }
})
router.get('/allvideos', async (req, res) => {
    const videos = await allVideos()

    res.json({
        videos
    })
})

// DOCTOR
router.get('/doctor', async (req, res) => {
    const doctors = await allDoctors()
    res.render('adminDoctor', {
        doctors
    })
})
router.post('/doctor',expressFileUpload(), async (req, res) => {
    try {
        const {
            name,
            special,
            about, 
            phone_number
        } = req.body
        const doctors = await allDoctors()


        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(name || special || phone_number || about)) {
            throw new Error('Bo\'shliqlarni to\'ldiring')
        }

        if(!(about.length <= 2048)){
            res.render('adminDoctor', {
                error: "Iltimos 2048 ta belgidan kamroq ma'lumot kiriting!",
                doctors
            })
            return;
        }
        const doctor = addDoctor(name, special, about, phone_number, filename)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', 'doctors', filename),
        )
        res.render('adminDoctor', {
            message: "Muvoffaqiyatli qo'shildi!",
            doctors
        })

    } catch (error) {
        console.log(error);
    }

})
router.delete('/doctor/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteDoctorById(req.params.id)

        if (deleteOne) {
            res.json({
                message: 'Docktor deleted'
            })
        }

    } catch (error) {
        res.json({
            error: error
        })
    }
})
router.get('/doctor/edite/:id', async (req, res) => {
    try {
        const doctor = await findDoctorById(new ObjectId(req.params.id))
        if (!doctor) {
            res.render('adminDoctor', {
                title: 'Admin panel',
                error: "Bunday doctor mavjud emas"
            })
        }
        res.render('editDoctor', {
            title: doctor.name,
            doctor
        })
    } catch (error) {
        console.log(error);
    }
})
router.post('/doctor/edite', expressFileUpload(), async (req, res) => {
    try {
        const {
            name,
            special,
            about, 
            phone_number,
            id
        } = req.body

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(name || special || phone_number || about)) {
            throw new Error('Bo\'shliqlarni to\'ldiring')
        }

        if(!(about.length <= 2048)){
            res.render('adminDoctor', {
                error: "Iltimos 2048 ta belgidan kamroq ma'lumot kiriting!",
                doctors
            })
            return;
        }
        const doctor = updateDoctor(name, special, about, phone_number, filename, id)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', 'doctors', filename),
        )
        res.redirect('/admin/doctor')
    } catch (error) {
        console.log(error);
    }
})


// Cotegorys

router.get('/admin/category', (req, res) => {
    res.render('admincategory', {
        title: "Categorys"
    })
})

module.exports = {
    path: '/admin',
    router
}