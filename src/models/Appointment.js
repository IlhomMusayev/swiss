const { Schema, model } = require('mongoose')
const client = require('../modules/mongo')

const AppointmentSchema = new Schema({
    name: {
        type: String, 
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
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

async function addAppointmentModel(name, phone, email, password, isAdmin){
    let db = await AppointmentModel()
    return await db.create({ name, phone, email, password, isAdmin})
}
module.exports = {
    allAppointmentModel,
    addAppointmentModel
}