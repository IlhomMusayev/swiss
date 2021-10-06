const mongoose = require('mongoose')

async function client () {
    let server = await mongoose.connect(`mongodb+srv://ilhomjon:AJCmvRUTfJ8yq2Cu@cluster0.vj4xf.mongodb.net/swistdental`, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })  
    return server
}


module.exports = client
