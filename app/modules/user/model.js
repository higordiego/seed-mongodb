const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}},
    avatar: {type: String, default: ''},
    active: {type: Number, defaul: 0},
    number: {type: Number, required: true},
    ddd: {type: Number, required: true},
    ddi: {type: Number, required: true},
    token: {type: String, default: ''},
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', User)
