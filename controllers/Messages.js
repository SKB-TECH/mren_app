const { Mongoose } = require('mongoose')
const messageModel = require('../models/Message')
const io = require('../socket')

exports.newMessage = async (req, res) => {

    const { recever, message } = req.body
    const sender = req.params.id
    const messages = new messageModel({
        sender,
        message,
        recever
    })
    try {
        const newMessage = await messages.save()
        res.status(201).json(newMessage)
        
        io.getIo().emit('message', newMessage)
    }

    catch (error) {
        //res.status(500).json(error)
        console.log(error)
    }
}

exports.readMessage = async (req, res) => {
    const sender = req.params.id
    try {
        const message = await messageModel.find({
            $or: [
                { sender: sender },
                { recever: sender },
            ]
        }).sort({ createdAt: "ascending" })
        res.status(200).json({ message })
    } catch (error) {
        res.status(500).json(error)
    }
}


