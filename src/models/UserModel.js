const { Schema, model } = require('mongoose')
const client = require('../modules/mongo')

const UserSchema = new Schema({
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
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

async function UserModel () {
    let db = await client()
     return await db.model('users', UserSchema)
}

async function allUsers(){
    let db = await UserModel()
    return await db.find()
}

async function addUser(name, phone, email, password, isAdmin){
    let db = await UserModel()
    return await db.create({ name, phone, email, password, isAdmin})
}

async function findUserByEmail(email){
    let db = await UserModel()
    return await db.findOne({ email: email })
}

async function findUserByPhone(phone){
    let db = await UserModel()
    return await db.findOne({ phone: phone })
}

async function findUser(email, phone){
    let db = await UserModel()
    return await db.findOne({ $or: [{ phone: phone }, {email: email}]})
}

async function editUser(email, name, new_password){
    let db = await UserModel()
    return await db.updateOne({
        email: email
    }, {
        $set: {
            name: name,
            password: new_password,
        }
    })
}


module.exports = {
    addUser,
    findUserByPhone,
    findUserByEmail,
    findUser,
    allUsers,
    editUser
}