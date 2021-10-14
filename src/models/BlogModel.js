const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const BlogsScheme = new Schema({
    title_uz: {
        type: 'string',
        required: true,
        minLength: 5,
        trim: true,
    },
    title_ru: {
        type: 'string',
        required: true,
        minLength: 5,
        trim: true,
    },
    content_uz: {
        type: 'string',
        required: true,
        minLength: 100,
        trim: true,
    },
    content_ru: {
        type: 'string',
        required: true,
        minLength: 100,
        trim: true,
    },
    filename: {
        type: 'string',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function BlogModel() {
    let db = await client()
    return await db.model('news', BlogsScheme)
}

async function allBlogs() {
    let db = await BlogModel()
    return await db.find({}).sort({dateCreated: -1})
}


async function addBlog(title_uz, title_ru, content_uz, content_ru, filename) {
    let db = await BlogModel()
    return await db.create({
        title_uz,
        title_ru,
        content_uz,
        content_ru,
        filename
    })
}

async function findBlogById(id) {
    let db = await BlogModel()
    return await db.findOne({
        _id: id
    })
}

async function updateOneBlogModel(title_uz, title_ru, content_uz, content_ru, filename, id) {
    let db = await BlogModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            title_uz: title_uz,
            title_ru: title_ru,
            content_uz: content_uz,
            content_ru: content_ru,
            filename: filename
        }
    })
}


async function deleteOneById(id) {
    let db = await BlogModel()
    return await db.deleteOne({
        _id: id
    })
}


module.exports = {
    BlogModel,
    addBlog,
    allBlogs,
    findBlogById,
    updateOneBlogModel,
    deleteOneById,
}