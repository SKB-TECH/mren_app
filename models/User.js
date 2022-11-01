const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 60
    },
    password: {
        type: String,
        required: true,
        unique: true,
        min: 6,
        max: 12
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    follewers: {
        type: Array,
        default: []
    },
    follewing: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 250
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationShip: {
        type: Number,
        enum: [1, 2, 3]
    }
}, {
    timestamps: true
})
const userModel = mongoose.model("user", userSchema)
module.exports = userModel