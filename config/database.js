const mongoose = require('mongoose')
exports.database = () => {
    try {
        mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log("Connected successfuly")
        })
    } catch (error) {
        console.log(error);
    }
}
