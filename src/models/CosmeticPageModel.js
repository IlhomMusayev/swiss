const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const CosmeticScheme = new Schema({
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
    content1_uz: {
        type: 'string',
        required: true,
        trim: true,

    },
    content1_ru: {
        type: 'string',
        required: true,
        trim: true,
    },
    filename1: {
        type: 'string',
        required: true,

    },
    caption1_uz: {
        type: 'string',
        required: true,
        trim: true,
    },
    caption1_ru: {
        type: 'string',
        required: true,
        trim: true,
    },
    filename2: {
        type: 'string',
        required: true,
    },
    caption2_uz: {
        type: 'string',
        required: true,
        trim: true,
    },
    caption2_ru: {
        type: 'string',
        required: true,
        trim: true,
    },
    content2_uz: {
        type: 'string',
        required: true,
        trim: true,
    },
    content2_ru: {
        type: 'string',
        required: true,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function CosmeticModel() {
    let db = await client()
    return await db.model('cosmetic', CosmeticScheme)
}

async function allCosmetic() {
    let db = await CosmeticModel()
    return await db.find({})
}


async function addCosmetic(title_uz, title_ru, content1_uz, content1_ru, filename1, caption1_uz, caption1_ru, filename2, caption2_uz, caption2_ru, content2_uz, content2_ru) {
    let db = await CosmeticModel()
    return await db.create({
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
    })
}
async function updateCosmetic(title_uz, title_ru, content1_uz, content1_ru, filename1, caption1_uz, caption1_ru, filename2, caption2_uz, caption2_ru, content2_uz, content2_ru, id) {
    let db = await CosmeticModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            title_uz: title_uz,
            title_ru: title_ru,
            content1_uz: content1_uz,
            content1_ru: content1_ru,
            filename1: filename1,
            caption1_uz: caption1_uz,
            caption1_ru: caption1_ru,
            filename2: filename2,
            caption2_uz: caption2_uz,
            caption2_ru: caption2_ru,
            content2_uz: content2_uz,
            content2_ru: content2_ru
        }
    })
}



module.exports = {
    CosmeticModel,
    addCosmetic,
    allCosmetic,
    updateCosmetic
}