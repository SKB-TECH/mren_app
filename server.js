const express = require('express')
const mongoos = require('mongoose')
const dotenv = require('dotenv')
const { database } = require('./config/database')
const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require("./routes/users")
const postRouter = require("./routes/post")
const authRouter = require("./routes/auth")
dotenv.config({ path: "./config/.env" })

// connecte to database
database()
const app = express()

// middleware
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

// les routes
app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/auth", authRouter)


app.listen(8800, (error) => {
    if (!error) {
        console.log("Server listinin on the port 8800")
    }
})