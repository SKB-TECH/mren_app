const { Mongoose } = require('mongoose')
const messageModel = require('../models/Message')



exports.newMessage = async (req, res) => {
    const userId = req.params.id
    const messages = {
        userId,
        message: req.body.message,
        recId: req.body.recId
    }

    try {
        const newMessage = await messages.save()
        res.status(200).json(newMessage)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

exports.readMessage = async (req, res) => {

}


