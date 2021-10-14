const { verify, sign } = require('jsonwebtoken')

const SECRET_WORD = process.env.SECRET_WORD || "SECRET_WORD"

function genereteToken(data) {
    return sign(data, SECRET_WORD)
}

function checkToken(data) {
    try {
        return verify(data, SECRET_WORD)
    }
    catch (e){
        return false
    }
}

module.exports = {
    genereteToken, checkToken
}