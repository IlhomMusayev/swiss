const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const CategorySchema = new Schema({
    name_uz:{
        type: 'string',
        required: true,
        trim: true,
    },
    name_ru:{
        type: 'string',
        required: true,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function CategoryModel(){
    let db = await client()
    return await db.model('categorys', CategorySchema)
}

async function allCategorys() {
    let db = await CategoryModel()
    return await db.find({})
}


async function addCategory(name_uz, name_ru) {
    let db = await CategoryModel()
    return await db.create({
        name_uz, name_ru
    })
}

async function findCategoryById(id) {
    let db = await CategoryModel()
    return await db.findOne({
        _id: id
    })
}

async function updateCategory(name_uz, name_ru, id) {
    let db = await CategoryModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            name_uz: name_uz, 
            name_ru: name_ru
        }
    })
}

async function deleteOneCategoryById(id) {
    let db = await CategoryModel()
    return await db.deleteOne({
        _id: id
    })
}

module.exports = {
    CategoryModel,
    addCategory,
    allCategorys,
    findCategoryById,
    updateCategory,
    deleteOneCategoryById
}

