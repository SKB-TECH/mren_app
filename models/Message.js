const mongoose = require('mongoose')

const schemaMessage = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
    },
    recever: {
        type: mongoose.Types.ObjectId,
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