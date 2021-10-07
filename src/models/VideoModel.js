const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const VideosScheme = new Schema({
    video_link: {
        type: 'string',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function VideosModel() {
    let db = await client()
    return await db.model('videogaley', VideosScheme)
}

async function allVideos() {
    let db = await VideosModel()
    return await db.find()
}


async function addVideo(video_link) {
    let db = await VideosModel()
    return await db.create({
        video_link
    })
}


async function deleteOneVideoById(id) {
    let db = await VideosModel()
    return await db.deleteOne({
        _id: id
    })
}


module.exports = {
    allVideos,
    addVideo,
    deleteOneVideoById
}