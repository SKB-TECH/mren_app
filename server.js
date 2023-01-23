const express = require('express')
const dotenv = require('dotenv')
const { database } = require('./config/database')
const morgan = require('morgan')
const helmet = require('helmet')
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const messageRouter = require("./routes/Messages")
const cookieParser = require('cookie-parser')
const cors = require("cors")
const messageModel = require('./models/Message')
const mongoose = require('mongoose');
const app=express()

dotenv.config({ path: "./config/.env" })
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors());

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)

mongoose.connect(process.env.MONGODB)
    .then(res => {
        console.log('db connected')
    }).catch(error => {
        console.log(error);
})

const server = app.listen(process.env.PORT)
const io = require('./socket.js').init(server)

io.on('connection', socket => {
    console.log('client connected', socket.id)
})

module.exports=server