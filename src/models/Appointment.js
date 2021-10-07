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
        type: Number,
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
    service__includes__label: {
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

async function addAppointmentModel(full_name, phone_number, filial, service__label, service__includes__label){
    let db = await AppointmentModel()
    return await db.create({full_name, phone_number, filial, service__label, service__includes__label})
}
module.exports = {
    AppointmentModel,
    allAppointmentModel,
    addAppointmentModel
}