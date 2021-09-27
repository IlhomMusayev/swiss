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
    phone: {
        type: Number,
        required: true,
        trim: true,
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
    return await db.find()
}

async function addAppointmentModel(full_name, phone){
    let db = await AppointmentModel()
    return await db.create({full_name, phone})
}
module.exports = {
    allAppointmentModel,
    addAppointmentModel
}