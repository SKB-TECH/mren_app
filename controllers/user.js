const bcrypt = require('bcrypt')
const userModel = require('../models/User')
const User = require('../models/User')

// singup
exports.register = async (req, res) => {
    const passwordSalt = bcrypt.genSalt()
    try {
        // generated password salt
        const salt = await bcrypt.genSalt(10)
        const haltSalt = await bcrypt.hash(req.body.password, salt)

        // created new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: haltSalt
        })

        const user = await newUser.save()
        res.status(200).send({ user })
    } catch (error) {
        console.log(error)
    }
}

// singin
exports.login = async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        try {
            // verification de l'adresse mail
            const user = await User.findOne({ email })
            !user && res.status(404).json("user or email adress not found")

            // verification du mot de pass
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong Password")

            const status = await userModel.findByIdAndUpdate(user._id,
                { $addToSet: { online: true } },
                { new: true, upsert: true }
            )
            res.status(200).json(status)

        } catch (error) {
            res.status(500).json(error)
        }
    }
    else {
        res.status(501).json({ message: "Email or Password is empty" })
    }
}

// getAllUsers
exports.getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        const { password, updatedAt, ...other } = user._doc

        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
}

// tout les utilisateurs du systeme
exports.getAllUser = async (req, res) => {
    try {
        const user = await User.find().select("-password")
        // const { password, updatedAt, ...other } = user._doc
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// les utilisateurs connecter
exports.getUsersOnline = async (req, res) => {
    try {
        const user = await User.find()
        // const { password, updatedAt, ...other } = user._doc
        res.status(200).json(user)
    }
    catch (error) {
        res.status(500).json(error)
    }
}
// update
exports.update_user = async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id,
                {
                    $set: req.body
                })
            res.status(200).json("Update successfuly")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        res.status(401).json("You can update only your account")
    }
}

// delete
exports.delete_user = async (req, res) => {
    if (req.body.userId == req.params.id) {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Your Account has been deleted")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        res.status(401).json("You can delete only your account")
    }
}

// follow
exports.follow = async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const current = await User.findById(req.body.userId)

            if (!user.follewers.includes(req.body.userId)) {
                await user.updateOne({ $push: { follewers: req.body.userId } })
                await current.updateOne({ $push: { follewing: req.params.id } })
                res.status(200).json("follow has been passed")
            } else {
                res.status(401).json('you already follew this user')
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you cant follower yourself")
    }
}

// unfollow
exports.unfollow = async (req, res) => {
    if (req.body.userId != req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const current = await User.findById(req.body.userId)

            if (user.follewers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { follewers: req.body.userId } })
                await current.updateOne({ $pull: { follewing: req.params.id } })
                res.status(200).json("unfollow has been passed")
            } else {
                res.status(401).json('you already unfollew this user')
            }

        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("you cant unfollow yourself")
    }
}