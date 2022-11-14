const express = require('express')
const mongoos = require('mongoose')
const dotenv = require('dotenv')
const { database } = require('./config/database')
const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require("./routes/users")
const postRouter = require("./routes/post")
const authRouter = require("./routes/auth")
const messageRouter = require("./routes/Messages")
const passport = require('passport')
const session = require('express-session')
const cors = require("cors")


dotenv.config({ path: "./config/.env" })
// connecte to database
database()
const app = express()

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(morgan("common"))
app.use(helmet())

app.use(cors({
    origin: "http://localhost:5173/",
    credentials: false
}))


app.use(session({
    name: "user_session",
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRETE_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false
    }
}))



// les routes
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)


app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server listinin on the port ${process.env.PORT}`)
    }
})