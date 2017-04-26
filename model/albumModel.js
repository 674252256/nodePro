const mongoose = require('mongoose')
const db = require('./db.js')

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    }
})
module.exports = db.model('album', albumSchema, 'album')