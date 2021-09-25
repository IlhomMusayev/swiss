const moment = require('moment')

moment.locale('ru-Ru')
let date = moment().format('LL')
console.log(date)