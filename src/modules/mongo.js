const mongoose = require('mongoose')

async function client () {
    let server = await mongoose.connect(`mongodb+srv://ilhomjon:AJCmvRUTfJ8yq2Cu@cluster0.vj4xf.mongodb.net/swistdental`, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })  
    console.log("connect mongodb");
    return server
}


module.exports = client
