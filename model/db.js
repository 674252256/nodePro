const mongoose = require('mongoose')
// mongoose.Promise = global.Promise
const db = mongoose.createConnection('localhost', 'pictureDB');

db.on('error', function() {
    console.log('____connect failed____')
})

db.once('open', function() {
    console.log('____connect successful！____')
})

module.exports = db
