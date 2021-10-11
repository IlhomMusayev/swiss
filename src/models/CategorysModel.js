const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const CategorySchema = new Schema({
    name:{
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
    return await db.model('categorys', categorySchema)
}
