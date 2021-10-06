const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const AboutScheme = new Schema({
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

async function AboutModel() {
    let db = await client()
    return await db.model('about', AboutScheme)
}

async function allAbout() {
    let db = await AboutModel()
    return await db.find({})
}


async function addAbout(title_uz, title_ru, content_uz, content_ru, filename) {
    let db = await AboutModel()
    return await db.create({
        title_uz,
        title_ru,
        content_uz,
        content_ru,
        filename
    })
}


async function updateAbout(title_uz, title_ru, content_uz, content_ru, filename, id) {
    let db = await AboutModel()
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



module.exports = {
    AboutModel,
    addAbout,
    allAbout,
    updateAbout
}