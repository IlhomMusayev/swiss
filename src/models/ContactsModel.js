const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')
const client = require('../modules/mongo')
const ContactSchema = new Schema({
    phone_number: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        trim: true
    },
    address: {
        type: 'string',
        required: true,
        trim: true
    },
    facebook: {
        type: 'string',
        trim: true
    },
    instagram: {
        type: 'string',
        trim: true
    },
    telegram: {
        type: 'string',
        trim: true
    },
    twitter: {
        type: 'string',
        trim: true
    },
    aboutuz: {
        type: 'string',
        required: true,
        trim: true
    },
    aboutru: {
        type: 'string',
        required: true,
        trim: true
    }
})


const ContactModel = async function () {
    let db = await client()
    return await db.model('contacts', ContactSchema)
}

async function allContacts() {
    let db = await ContactModel()
    return await db.find({})
}


async function addContact(phone_number, email, address, facebook, instagram, telegram, twitter, aboutuz, aboutru) {
    let db = await ContactModel()
    return await db.create({
        phone_number, email, address, facebook, instagram, telegram, twitter, aboutuz, aboutru
    })
}


async function updateContact(phone_number, email, address, facebook, instagram, telegram, twitter, aboutuz, aboutru, id) {
    let db = await ContactModel()
    return await db.updateOne({
        _id: id
    }, {
        $set: {
            phone_number: phone_number,
            email: email,
            address: address,
            facebook: facebook,
            instagram: instagram,
            telegram: telegram,
            twitter: twitter,
            aboutuz: aboutuz,
            aboutru: aboutru
        }
    })
}



module.exports = {
    ContactModel,
    addContact,
    allContacts,
    updateContact
}