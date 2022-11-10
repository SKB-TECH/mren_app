const router = require('express').Router()
const { newMessage, readMessage } = require('../controllers/Messages')

router.post('/new', newMessage)
router.get('/read', readMessage)


module.exports = router