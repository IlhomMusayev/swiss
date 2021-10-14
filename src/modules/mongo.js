const mongoose = require('mongoose')
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://ilhomjon:AJCmvRUTfJ8yq2Cu@cluster0.vj4xf.mongodb.net/swistdental"

async function client () {
    let server = await mongoose.connect(MONGODB_URL, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })  
    return server
}


module.exports = client
