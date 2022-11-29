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
const http = require('http')
const { Server } = require('socket.io')
const messageModel = require('./models/Message')

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

/**
    creation de la connexion socket.io
*/

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User is Connected:${socket.id}`);

    // signalisation des message
    socket.on("new", (data) => {
        const { sender, msg, recever } = data
        const messages = new messageModel({
            sender,
            message: msg,
            recever
        })
        messages.save()
            .then(res => {
                io.emit("msgsend", res)
            })
            .catch(error => console.log(error.message));
    })
    socket.emit('connection', null);
    socket.on("disconnected", (socket) => {
        console.log(`User is Disonnected:${socket.id}`)
    })
})
// fin socket.io
server.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(`Server listinin on the port ${process.env.PORT}`)
    }
})