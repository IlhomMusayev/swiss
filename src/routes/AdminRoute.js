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
    CosmeticModel,
    addCosmetic,
    allCosmetic,
    updateCosmetic
} = require('../models/CosmeticPageModel')

const {
    TreatmentModel,
    addTreatment,
    allTreatment,
    updateTreatment
} = require('../models/TreatmentPageModel')

const {
    ContactModel,
    addContact,
    allContacts,
    updateContact
} = require('../models/ContactsModel')

const {
    allPhotos,
    addPhoto,
    deleteOnePhotoById
} = require('../models/PhotosModel')

const {
    CategoryModel,
    addCategory,
    allCategorys,
    updateCategory,
    findCategoryById,
    deleteOneCategoryById
} = require('../models/CategorysModel')

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

const {
    FilialsModel,
    deleteFilialById,
    addFilial,
    findFilialsById,
    allFilials
} = require('../models/FilialsModel')

const adminMiddleware = require('../middlewares/adminMiddleware')
const expressFileUpload = require('express-fileupload');
const path = require('path');
const router = require('express').Router()
const fs = require('fs');
const ObjectId = require('mongodb').ObjectId
const {
    AppointmentModel,
    allAppointmentModel,
    findTodayAppointments,
    updateOneAppointment,
    findAppointmentById
} = require('../models/Appointment')



router.use(adminMiddleware)


router.get('/', async (req, res) => {
    // 
    var now = new Date();
    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (req.query.skipappontment <= 0) {
        res.render('error', {
            user: req.user,
            language: req.language === 'uz' ? 'uz' : "ru"
        })
        return;
    }
    const skipappontment = req.query.skipappontment * 1 || 0;
    const AppointmentModels = await AppointmentModel()
    const allAppointments = await allAppointmentModel()
    const allAppointmentPog = await AppointmentModels
        .find({
            dateCreated: {
                $gte: startOfToday
            }
        })
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

router.post('/chackAppointment/:id', async (req, res) => {
    const id = req.params.id
    const appointmentItem = await findAppointmentById(id)
    console.log(appointmentItem);
    console.log(id);
    const update = await updateOneAppointment(true, id)
    console.log(update);
    res.json({
        message: "???????? ????????????????????????, ?????? ???? ?????????????????? ?? ??????????????????"
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
router.post('/about', async (req, res) => {
    try {
        const allAbouts = await allAbout()
        const allPhotoss = await allPhotos()
        const allVideoss = await allVideos()
        const {
            title_uz,
            title_ru,
            content_uz,
            content_ru,
            id
        } = req.body

        if (!(title_uz || title_ru || content_uz || content_ru)) {
            res.render('adminAbout', {
                error: "?????????????????? ?????? ????????!",
                allAbouts: allAbouts[0],
                photos: allPhotoss,
                videos: allVideoss
            })
        }

        if (allAbouts.length <= 0) {
            await addAbout(title_uz, title_ru, content_uz, content_ru)
            res.render('adminAbout', {
                message: "???????????????????? ?? ?????? ?????????? ??????????????????",
                allAbouts: allAbouts[0],
                photos: allPhotoss,
                videos: allVideoss
            })
            return;
        }
        await updateAbout(title_uz, title_ru, content_uz, content_ru, id.trim())
        res.render('adminAbout', {
            message: "???????????????????? ?? ?????? ????????????????????",
            allAbouts: allAbouts[0],
            photos: allPhotoss,
            videos: allVideoss
        })
    } catch (error) {
        console.log(error);

    }
})
// COSMETIC
router.get('/cosmetic', async (req, res) => {
    const allCosmetics = await allCosmetic()
    res.render('adminCosmetic', {
        allCosmetics: allCosmetics[0]
    })
})
router.post('/cosmetic', expressFileUpload(), async (req, res) => {
    const allCosmetics = await allCosmetic()
    try {

        const {
            title_uz,
            title_ru,
            content1_uz,
            content1_ru,
            caption1_uz,
            caption1_ru,
            caption2_uz,
            caption2_ru,
            content2_uz,
            content2_ru,
            id
        } = req.body

        const imgName1 = req.files.filename1.name.split(".")

        const filename1 = req.files.filename1.md5 + '.' + imgName1[imgName1.length - 1]

        const imgName2 = req.files.filename2.name.split(".")

        const filename2 = req.files.filename2.md5 + '.' + imgName2[imgName2.length - 1]

        if (!(title_uz || title_ru || content1_uz || content1_ru || content2_uz || content2_ru || caption1_ru || caption2_ru || caption1_uz || caption2_uz)) {
            throw new Error('?????????????????? ?????? ???????? !!!')
        }

        if (allCosmetics.length <= 0) {
            await addCosmetic(
                title_uz,
                title_ru,
                content1_uz,
                content1_ru,
                filename1,
                caption1_uz,
                caption1_ru,
                filename2,
                caption2_uz,
                caption2_ru,
                content2_uz,
                content2_ru
            )
            req.files.filename1.mv(
                path.join(__dirname, '..', 'public', 'files', filename1),
            )
            req.files.filename2.mv(
                path.join(__dirname, '..', 'public', 'files', filename2),
            )
            res.render('adminCosmetic', {
                status: ok,
                message: "???????????????????? ?????????????????? ????????????????????.",
                allCosmetics: allCosmetics[0]
            })
        }
        await updateCosmetic(
            title_uz, title_ru, content1_uz, content1_ru, filename1, caption1_uz, caption1_ru, filename2, caption2_uz, caption2_ru, content2_uz, content2_ru, id.trim())

        // fs.unlinkSync(`../public/files/${allCosmetics[0].filename1}`)
        // fs.unlinkSync(`../public/files/${allCosmetics[0].filename2}`)

        req.files.filename1.mv(
            path.join(__dirname, '..', 'public', 'files', filename1),
        )
        req.files.filename2.mv(
            path.join(__dirname, '..', 'public', 'files', filename2),
        )
        res.render('adminCosmetic', {
            status: ok,
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            allCosmetics: allCosmetics[0]
        })
    } catch (error) {
        res.render('adminCosmetic', {
            status: false,
            error: error + "",
            allCosmetics: allCosmetics[0]
        })

    }
})
// Treatment
router.get('/treatment', async (req, res) => {
    const allTreatments = await allTreatment()
    res.render('adminTreatment', {
        allTreatments: allTreatments[0]
    })
})
router.post('/treatment', expressFileUpload(), async (req, res) => {
    try {
        const allTreatments = await allTreatment()

        const {
            title_uz,
            title_ru,
            content1_uz,
            content1_ru,
            caption1_uz,
            caption1_ru,
            caption2_uz,
            caption2_ru,
            content2_uz,
            content2_ru,
            id
        } = req.body

        const imgName1 = req.files.filename1.name.split(".")

        const filename1 = req.files.filename1.md5 + '.' + imgName1[imgName1.length - 1]

        const imgName2 = req.files.filename2.name.split(".")

        const filename2 = req.files.filename2.md5 + '.' + imgName2[imgName2.length - 1]

        if (!(title_uz || title_ru || content1_uz || content1_ru || content2_uz || content2_ru || caption1_ru || caption2_ru || caption1_uz || caption2_uz)) {
            throw new Error('?????????????????? ?????? ???????? !!!')
        }

        if (allTreatments.length <= 0) {
            await addTreatment(
                title_uz,
                title_ru,
                content1_uz,
                content1_ru,
                filename1,
                caption1_uz,
                caption1_ru,
                filename2,
                caption2_uz,
                caption2_ru,
                content2_uz,
                content2_ru
            )
            req.files.filename1.mv(
                path.join(__dirname, '..', 'public', 'files', filename1),
            )
            req.files.filename2.mv(
                path.join(__dirname, '..', 'public', 'files', filename2),
            )
            res.render('adminTreatment', {
                message: "???????????????????? ?????????????????? ????????????????????.",
                allTreatments: allTreatments[0]
            })
        }
        await updateTreatment(
            title_uz, title_ru, content1_uz, content1_ru, filename1, caption1_uz, caption1_ru, filename2, caption2_uz, caption2_ru, content2_uz, content2_ru, id.trim())

        // fs.unlinkSync(`../public/files/${allCosmetics[0].filename1}`)
        // fs.unlinkSync(`../public/files/${allCosmetics[0].filename2}`)

        req.files.filename1.mv(
            path.join(__dirname, '..', 'public', 'files', filename1),
        )
        req.files.filename2.mv(
            path.join(__dirname, '..', 'public', 'files', filename2),
        )
        res.render('adminTreatment', {
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            allTreatments: allTreatments[0]
        })
    } catch (error) {
        console.log(error);
    }
})
// Contact
router.get('/contacts', async (req, res) => {
    const allContact = await allContacts()
    res.render('adminContacts', {
        allContact: allContact[0]
    })
})
router.post('/contacts', async (req, res) => {
    const allContact = await allContacts()
    try {
        const {
            phone_number,
            email,
            address,
            facebook,
            instagram,
            telegram,
            twitter,
            aboutuz,
            aboutru,
            id
        } = req.body

        if (!(phone_number || email || address || facebook || instagram || telegram || twitter || aboutuz || aboutru)) {
            res.render('adminContacts', {
                allContact,
                error: "?????????????????? ?????? ???????? !!!"
            })
        }

        if (allContact.length <= 0) {
            await addContact(
                phone_number, email, address, facebook, instagram, telegram, twitter, aboutuz, aboutru
            )
            res.render('adminContacts', {
                message: "???????????????????? ?????????????????? ????????????????????.",
                allContact: allContact[0]
            })
        }
        await updateContact(
            phone_number, email, address, facebook, instagram, telegram, twitter, aboutuz, aboutru, id.trim())

        res.render('adminContacts', {
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            allContact: allContact[0]
        })
    } catch (error) {
        console.log(error);
        res.render('adminContacts', {
            allContact,
            error: error + ""
        })
    }
})
// Categorys

router.get('/categorys', async (req, res) => {
    const categorys = await allCategorys()
    res.render('adminCategory', {
        categorys
    })
})
router.post('/categorys', async (req, res) => {
    const categorys = await allCategorys()
    try {
        const {
            name_uz,
            name_ru
        } = req.body
        if (!(name_uz, name_ru)) {
            throw new Error('?????????????????? ?????? ???????? !!!"')
        }

        const category = addCategory(name_uz, name_ru)
        res.render('adminCategory', {
            message: "???????????????????? ?????????????????? ????????????????????.",
            categorys
        })

    } catch (error) {
        res.render('adminCategory', {
            error: error + "",
            categorys
        })
    }
})
router.get('/categorys/edite/:id', async (req, res) => {
    try {
        const CategoryItem = await findCategoryById(new ObjectId(req.params.id))
        const categorys = await allCategorys()
        if (!CategoryItem) {
            res.render('adminCategory', {
                title: 'Admin panel',
                error: "Bunday blog mavjud emas",
                categorys
            })
        }
        res.render('editCategory', {
            title: CategoryItem.name,
            categorys: CategoryItem
        })
    } catch (error) {
        console.log(error);
    }
})
router.post('/categorys/edite', async (req, res) => {
    const categorys = await allCategorys()
    try {
        const {
            name_uz,
            name_ru,
            id
        } = req.body

        const updateCategorys = await updateCategory(name_uz,
            name_ru, id)
        res.render('adminCategory', {
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            categorys
        })

    } catch (error) {
        console.log(error);
    }
})
router.delete('/categorys/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteOneCategoryById(req.params.id)

        if (deleteOne) {
            res.json({
                message: '???????????????????? ???????? ?????????????? ??????????????.'
            })
        }

    } catch (error) {
        res.json({
            error: error
        })
    }

})


// BLOG
router.get('/news', async (req, res) => {
    const skipblog = req.query.skipblog * 1 || 0;
    const BlogModele = await BlogModel()
    const allblogs = await allBlogs()
    const allBlogsPog = await BlogModele
        .find()
        .skip(skipblog * 10)
        .limit(10)
    const allBlogsCount = await allblogs.length

    res.render('adminNews', {
        skipblog,
        allBlogsPog,
        allBlogsCount,
    })
})
router.post('/news', expressFileUpload(), async (req, res) => {
    try {
        const skipblog = req.query.skipblog * 1 || 0;
        const BlogModele = await BlogModel()
        const allblogs = await allBlogs()
        const allBlogsPog = await BlogModele
            .find()
            .skip(skipblog * 10)
            .limit(10)
        const allBlogsCount = await allblogs.length

        const {
            title_uz,
            title_ru,
            content_uz,
            content_ru
        } = req.body

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(title_uz || content_uz || title_ru || content_ru)) {
            res.render('adminNews', {
                error: "????????????????????, ?????????????????? ?????? ????????",
                skipblog,
                allBlogsPog,
                allBlogsCount,
            })
        }

        const news = addBlog(
            title_uz,
            title_ru,
            content_uz,
            content_ru,
            filename)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )

        res.render('adminNews', {
            message: "?????????????? ??????????????????",
            skipblog,
            allBlogsPog,
            allBlogsCount,
        })

    } catch (error) {
        console.log(error);
    }
})
router.get('/edite/:id', async (req, res) => {
    try {
        const blogItem = await findBlogById(new ObjectId(req.params.id))
        if (!blogItem) {
            res.redirect('/')
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
            title_uz,
            title_ru,
            content_uz,
            content_ru,
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

        const updateOneBlog = await updateOneBlogModel(
            title_uz,
            title_ru,
            content_uz,
            content_ru,
            filename, id)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', filename),
        )
        // delete img file for id in express app

        const skipblog = req.query.skipblog * 1 || 0;
        const BlogModele = await BlogModel()
        const allblogs = await allBlogs()
        const allBlogsPog = await BlogModele
            .find()
            .skip(skipblog * 10)
            .limit(10)
        const allBlogsCount = await allblogs.length
    
        res.render('adminNews', {
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            skipblog,
            allBlogsPog,
            allBlogsCount,
        })
    } catch (error) {
        console.log(error);
    }
})
router.delete('/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteOneById(req.params.id)

        if (deleteOne) {
            res.json({
                message: '?????????????? ???????? ?????????????? ??????????????.'
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
    try {
        const photos = req.files.photos
        const allAbouts = await allAbout()
        const allPhotoss = await allPhotos()
        const allVideoss = await allVideos()
        if (photos.length > 1) {
            for (let photo of photos) {
                const imgName = photo.name.split(".")
                const filename = photo.md5 + '.' + imgName[imgName.length - 1]
                photo.mv(
                    path.join(__dirname, '..', 'public', 'photogalery', filename),
                )
                const addPhotos = await addPhoto(filename)
                res.render('adminAbout', {
                    message: "???????????????????? ??????????????????!",
                    allAbouts: allAbouts[0],
                    photos: allPhotoss,
                    videos: allVideoss
                })
                return;
            }
        }
        const imgName = photos.name.split(".")
        const filename = photos.md5 + '.' + imgName[imgName.length - 1]
        photos.mv(
            path.join(__dirname, '..', 'public', 'photogalery', filename),
        )
        const addPhotos = await addPhoto(filename)
        res.render('adminAbout', {
            message: "???????????????????? ??????????????????!",
            allAbouts: allAbouts[0],
            photos: allPhotoss,
            videos: allVideoss
        })
    } catch (error) {
        console.log(error);
    }

})
router.get('/deletephoto/:id', async (req, res) => {
    try {
        await deleteOnePhotoById(req.params.id)
        const allAbouts = await allAbout()
        const allPhotoss = await allPhotos()
        const allVideoss = await allVideos()
        res.render('adminAbout', {
            message: "?????????????????????? ???????? ??????????????!",
            allAbouts: allAbouts[0],
            photos: allPhotoss,
            videos: allVideoss
        })
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

        const allAbouts = await allAbout()
        const allPhotoss = await allPhotos()
        const allVideoss = await allVideos()

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
        res.render('adminAbout', {
            message: "???????????? ???? ?????????? ??????????????????!",
            allAbouts: allAbouts[0],
            photos: allPhotoss,
            videos: allVideoss
        })
    } catch (error) {
        console.log(error);
    }
})
router.get('/deletevideo/:id', async (req, res) => {
    try {
        await deleteOneVideoById(req.params.id)
        const allAbouts = await allAbout()
        const allPhotoss = await allPhotos()
        const allVideoss = await allVideos()
        res.render('adminAbout', {
            message: "?????????? ???????? ??????????????!",
            allAbouts: allAbouts[0],
            photos: allPhotoss,
            videos: allVideoss
        })
    } catch (error) {
        console.log(error);
        res.redirect('/admin')
    }
})


// DOCTOR
router.get('/doctor', async (req, res) => {
    const doctors = await allDoctors()
    res.render('adminDoctor', {
        doctors
    })
})
router.post('/doctor', expressFileUpload(), async (req, res) => {
    try {
        const {
            name,
            special,
            about,
            phone_number
        } = req.body
        const doctors = await allDoctors()



        if (!(name || special || phone_number || about || req.files.image)) {
            res.render('adminDoctor', {
                error: "????????????????????, ?????????????????? ?????? ????????",
                doctors
            })
            return;
        }

        const imgName = req.files.image.name.split(".")

        const filename = req.files.image.md5 + '.' + imgName[imgName.length - 1]

        if (!(about.length <= 2048)) {
            res.render('adminDoctor', {
                error: "???????????????????? ???????????? ?????????? 2048 ???????????? ???????????????????? ?? ??????????????????????.",
                doctors
            })
            return;
        }
        const doctor = addDoctor(name, special, about, phone_number, filename)
        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', 'doctors', filename),
        )
        res.render('adminDoctor', {
            message: "???????????????? ????????????????????",
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
                message: '???????????????????? ????????????'
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
        const doctors = await allDoctors()
        const doctor = await findDoctorById(new ObjectId(req.params.id))
        if (!doctor) {
            res.render('adminDoctor', {
                error: "????????????????????, ?????????????????? ?????? ??????, ???????? ?????????? ???????????????????? ????????????????????",
                doctors
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
    const doctors = await allDoctors()
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
            throw new Error('????????????????????, ?????????????????? ?????? ????????!')
        }

        if (!(about.length <= 2048)) {
            res.render('adminDoctor', {
                error: "???????????????????? ???????????? ?????????? 2048 ???????????? ???????????????????? ?? ??????????????????????.",
                doctors
            })
            return;
        }
        const doctor = updateDoctor(name, special, about, phone_number, filename, id)

        req.files.image.mv(
            path.join(__dirname, '..', 'public', 'files', 'doctors', filename),
        )

        res.render('adminDoctor', {
            message: "???????????????????? ???????? ?????????????? ????????????????.",
            doctors
        })
    } catch (error) {
        console.log(error);
    }
})

// Filial
router.get('/filials', async (req, res) => {
    const filials = await allFilials()
    res.render('adminFilial', {
        filials
    })
})
router.post('/filials', async (req, res) => {
    const filials = await allFilials()
    try {
        const {
            name,
            email,
            phone_number
        } = req.body


        if (!(name || email || phone_number)) {
            res.render('adminFilial', {
                error: "????????????????????, ?????????????????? ?????? ????????",
                filials
            })
            return;
        }
        const filial = addFilial(name, email, phone_number)

        res.render('adminFilial', {
            message: "???????????????? ??????????????",
            filials
        })

    } catch (error) {
        console.log(error);
    }

})
router.delete('/filials/delete/:id', async (req, res) => {
    try {
        const deleteOne = await deleteFilialById(req.params.id)

        if (deleteOne) {
            res.json({
                message: '?????????????? ????????????a'
            })
        }

    } catch (error) {
        res.json({
            error: error
        })
    }
})



// Appointment
router.get('/appointments', async (req, res) => {
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
    res.render('adminAppointment', {
        skipappontment,
        allAppointmentPog,
        allAppointmentCount
    })
})

module.exports = {
    path: '/admin',
    router
}