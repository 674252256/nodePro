const mongoose = require('mongoose')
const db = require('./db.js')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    album: {
        type: mongoose.Schema.ObjectId,
        ref: 'album'
    }
})
module.exports = db.model('photo', photoSchema, 'photo')