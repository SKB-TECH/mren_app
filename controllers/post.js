const postModel = require('../models/Post')

// new post
exports.new_post = async (req, res) => {
    const newPost = new postModel(req.body)
    try {
        const npost = await newPost.save()
        res.status(200).json(npost)
    } catch (error) {
        res.status(500).json(error)
    }
}

// update_post
exports.update_post = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        console.log(post);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("the post has been updated successfuly")
        } else {
            res.status(403).json("you can update your post only")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// delete post
exports.delete_post = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        console.log(post);
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("the post has been deleted successfuly")
        } else {
            res.status(403).json("you can update your post only")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// likes post
exports.like_post = async (req, res) => {

}

// getOne post
exports.getOnepost = async (req, res) => {

}

// get time post
exports.getTimeLinePost = async (req, res) => {

}