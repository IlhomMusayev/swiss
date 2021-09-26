const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const BlogsScheme = new Schema({
    title: {
        type: 'string',
        required: true,
        minLength: 5,
        trim: true,
    },
    content: {
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
    slug: {
        type: String,
        slug: ["title", "subtitle"],
        slug_padding_size: 4,
        unique: true
    }


})

async function BlogModel() {
    let db = await client()
    return await db.model('blogs', BlogsScheme)
}

async function allBlogs() {
    let db = await BlogModel()
    return await db.find()
}

async function addBlog(title, content, filename) {
    let db = await BlogModel()
    return await db.create({
        title,
        content,
        filename
    })
}

async function findBlogById(id) {
    let db = await BlogModel()
    return await db.findOne({
        _id: id
    })
}

async function updateOneBlogModel(title, content, filename, id) {
    let db = await BlogModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            title: title,
            content: content,
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
    deleteOneById
}