const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')
const slug = require('mongoose-slug-generator')

mongoose.plugin(slug)

const PhotosScheme = new Schema({
    filename: {
        type: 'string',
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function PhotosModel() {
    let db = await client()
    return await db.model('photogaley', PhotosScheme)
}

async function allPhotos() {
    let db = await PhotosModel()
    return await db.find()
}


async function addPhoto(filename) {
    let db = await PhotosModel()
    return await db.create({
        filename
    })
}


async function deleteOnePhotoById(id) {
    let db = await PhotosModel()
    return await db.deleteOne({
        _id: id
    })
}


module.exports = {
    allPhotos,
    addPhoto,
    deleteOnePhotoById
}