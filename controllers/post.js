const postModel = require('../models/Post')
const userModel = require("../models/User")
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
    try {
        const post = await postModel.findById({ _id: req.params.id })
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            res.status(200).json("Your like has been successfuly")
        }
        else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            res.status(200).json("Your post has been disliked")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// getOne post
exports.getOne = async (req, res) => {
    const post = await postModel.findById(req.params.id)
    try {
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

// get time post
exports.getTimeLinePost = async (req, res) => {
    try {
        const currentUser = await userModel.findById({ _id: req.params.userId })
        const userPosts = await postModel.find({ userId: currentUser._id })

        const friendPost = await Promise.all(
            currentUser.follewing.map((friendId) => {
                return postModel.find({ userId: friendId })
            })

        )
        res.status(200).json(userPosts.concat(...friendPost))
    } catch (error) {
        res.status(500).json(error)
    }
}