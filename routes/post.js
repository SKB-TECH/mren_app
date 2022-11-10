const router = require("express").Router()
const postController = require('../controllers/post')

//les routes
router.post('/new_post', postController.new_post)
router.put('/:id/update_post', postController.update_post)
router.delete('/:id/delete_post/', postController.delete_post)
router.patch('/:id/like_post', postController.like_post)
router.get("/:id", postController.getOne);
router.get('/timeline/:userId', postController.getTimeLinePost)


module.exports = router