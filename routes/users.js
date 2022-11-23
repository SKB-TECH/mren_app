const router = require("express").Router()
const userController = require('../controllers/user')

// les routes pour les operation crud users
//router.get('/:id', userController.getUser)
router.get('/', userController.getAllUser)
//router.get('/online', userController.getUsersOnline)
router.put('/update/:id', userController.update_user)
router.delete('/delete/:id', userController.delete_user)


module.exports = router