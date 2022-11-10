const mongoose = require('mongoose')

const schemaMessage = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    users: {
        type: [],
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const messageModel = mongoose.model("message", schemaMessage)
module.exports = messageModel