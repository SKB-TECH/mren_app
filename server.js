const express = require('express')
const dotenv = require('dotenv')
const { database } = require('./config/database')
const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require("./routes/users")
const postRouter = require("./routes/post")
const authRouter = require("./routes/auth")
const messageRouter = require("./routes/Messages")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const verification = require('./utils/verification')
const { verify } = require('jsonwebtoken')


dotenv.config({ path: "./config/.env" })
// connecte to database
database()
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("common"))
app.use(helmet())

app.use(cors());


app.use("/api/user", userRouter)
app.use("/api/post", postRouter)
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)


app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server listinin on the port ${process.env.PORT}`)
    }
})