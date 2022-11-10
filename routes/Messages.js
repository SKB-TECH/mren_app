const router = require('express').Router()
const { newMessage, readMessage } = require('../controllers/Messages')

router.post('/new/:id', newMessage)
router.get('/read/:id', readMessage)


module.exports = router