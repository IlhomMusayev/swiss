const { Schema, model } = require('mongoose')
const client = require('../modules/mongo')

const AppointmentSchema = new Schema({
    full_name: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 50,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    filial: {
        type: String,
        required: true,
    },
    service__label: {
        type: String,
        required: true,
    },
    chack_in: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    email: {
        type: String,
        required: true,
    }
})

async function AppointmentModel () {
    let db = await client()
     return await db.model('appointments', AppointmentSchema)
}

async function allAppointmentModel(){
    let db = await AppointmentModel()
    return await db.find({})
}

async function addAppointmentModel(full_name, phone_number, filial, service__label, email){
    let db = await AppointmentModel()
    return await db.create({full_name, phone_number, filial, service__label, email})
}

async function findAppointmentByEmail(email){
    let db = await AppointmentModel()
    return await db.find({ email: email })
}

async function deleteOneAppointmentById(id) {
    let db = await AppointmentModel()
    return await db.deleteOne({
        _id: id
    })
}
async function findTodayAppointments(){

    let db = await AppointmentModel()
    return await db.find({dateCreated: {$gte: startOfToday}})
}



module.exports = {
    AppointmentModel,
    allAppointmentModel,
    addAppointmentModel,
    findAppointmentByEmail,
    deleteOneAppointmentById,
    findTodayAppointments
}