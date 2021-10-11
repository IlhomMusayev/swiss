const {
    Schema,
    model
} = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')

const DoctorsSchema = new Schema({
    name: {
        type: 'string',
        required: true,
        trim: true,
    },
    specials: {
        type: 'string',
        required: true,
        trim: true,
    },
    about: {
        type: 'string',
        required: true,
        trim: true,
    },
    phone_number: {
        type: 'number',
        required: true,
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

async function DoctorModel() {
    let db = await client()
    return await db.model('doctors', DoctorsSchema)
}

async function allDoctors() {
    let db = await DoctorModel()
    return await db.find({})
}

async function findDoctorById(id) {
    let db = await DoctorModel()
    return await db.findOne({
        _id: id
    })
}


async function addDoctor(name, specials, about, phone_number, filename) {
    let db = await DoctorModel()
    return await db.create({
        name,
        specials,
        about,
        phone_number,
        filename
    })
}


async function updateDoctor(name, specials, about, phone_number, filename, id) {
    let db = await DoctorModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            name: name,
            specials: specials,
            about: about,
            phone_number: phone_number,
            filename: filename
        }
    })
}
async function deleteDoctorById(id) {
    let db = await DoctorModel()
    return await db.deleteOne({
        _id: id
    })
}



module.exports = {
    DoctorModel,
    addDoctor,
    allDoctors,
    updateDoctor,
    deleteDoctorById,
    findDoctorById
}