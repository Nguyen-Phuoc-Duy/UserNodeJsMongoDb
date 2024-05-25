const mongoose  = require ('mongoose')
const Schema = mongoose.Schema

//taoj collection user = table
const Users = new Schema({
    username: {type: String, unique: true, maxLength: 255},
    password: {type: String},
    email: {type: String, unique: true},
    name: {type: String},
    avatar: {type: String},
    age: {type: Number, min: 18, max:65},
    available: {type: Boolean, default: false },
}, {
    timestamps: true
})

module.exports = mongoose.model('user', Users)