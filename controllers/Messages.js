const { Mongoose } = require('mongoose')
const messageModel = require('../models/Message')

exports.newMessage = async (req, res) => {
    const { recId, message } = req.body
    const userId = req.params.id

    const messages = new messageModel({
        userId,
        message: req.body.message,
        users: [userId, recId]
    })
    try {
        const newMessage = await messages.save()
        res.status(200).json(newMessage)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.readMessage = async (req, res) => {
    const recId = req.body.recId
    const userId = req.params.id
    try {
        const message = await messageModel.find({
            users: {
                $all: [userId, recId]
            }
        }).sort({ createdAt: "ascending" })
        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }
}


