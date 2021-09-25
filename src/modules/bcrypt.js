const bcrypt = require('bcrypt')

function genereteCrypt(data){
    let salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(data, salt)
}

// TODO: how t0 save and store hash??
function compareCrypt(data, hash) {
    try {
        return bcrypt.compare(data, hash)
    }
    catch (e){
        return false
    }
    
}

module.exports = {
    genereteCrypt,
    compareCrypt
}