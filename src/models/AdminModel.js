const { Schema, model } = require('mongoose')
const client = require('../modules/mongo')

const AdminSchema = new Schema({
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
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }, 
    isAdmin: {
        type: Boolean,
        default: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    }
})

async function AdminScheme () {
    let db = await client()
     return await db.model('admin', AdminSchema)
}


async function allUsers(){
    let db = await AdminScheme()
    return await db.find()
}

async function addUser(name, phone, email, password){
    let db = await AdminScheme()
    return await db.create({ name, phone, email, password})
}

async function findAdminByEmail(email){
    let db = await AdminScheme()
    return await db.findOne({ email: email })
}

async function findUserByPhone(phone){
    let db = await AdminScheme()
    return await db.findOne({ phone: phone })
}

async function findUser(email, phone){
    let db = await AdminScheme()
    return await db.findOne({ $or: [{ phone: phone }, {email: email}]})
}

module.exports = {
    addUser,
    findUserByPhone,
    findAdminByEmail,
    findUser,
    allUsers
}