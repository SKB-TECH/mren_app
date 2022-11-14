const bcrypt = require('bcrypt')
const userModel = require('../models/User')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


const maxAge = 1 * 24 * 60 * 60 * 1000

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRETE_KEY, {
        expiresIn: maxAge
    })
}
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
            online: true,
            password: haltSalt
        })

        const user = await newUser.save()
        if (user) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })

            res.status(200).send({ user })
        }
        else {
            res.status(403).json({ message: "Error to create account" })
        }

    } catch (error) {
        console.log(error)
    }
}

// singin
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            const valide = await bcrypt.compare(password, user.password)
            if (valide) {

                const token = createToken(user._id)
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge })

                await User.findByIdAndUpdate(user._id, { $set: { online: true } })
                res.status(200).json({ user })
            }
            else {
                res.status(403).json({ message: "Password is not valid" })
            }
        }
        else {
            res.status(403).json({ message: "Email adress is not valid" })
        }
    } catch (err) {
        res.status(501).json({ err: err })
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