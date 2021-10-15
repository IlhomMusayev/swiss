const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const FilialsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
})

async function FilialsModel() {
    let db = await client()
    return await db.model('filials', FilialsSchema)
}

async function allFilials() {
    let db = await FilialsModel()
    return await db.find({})
}

async function findFilialsById(id) {
    let db = await FilialsModel()
    return await db.findOne({
        _id: id
    })
}


async function addFilial(name, email, phone_number) {
    let db = await FilialsModel()
    return await db.create({
        name, email, phone_number
    })
}


async function deleteFilialById(id) {
    let db = await FilialsModel()
    return await db.deleteOne({
        _id: id
    })
}



module.exports = {
    FilialsModel,
    deleteFilialById,
    addFilial,
    findFilialsById,
    allFilials
}