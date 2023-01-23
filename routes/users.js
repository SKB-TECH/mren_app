const router = require("express").Router()
const userController = require('../controllers/user')

router.get('/', userController.getAllUser)
router.put('/update/:id', userController.update_user)
router.delete('/delete/:id', userController.delete_user)


module.exports = router