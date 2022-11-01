const mongoose = require('mongoose')
exports.database = () => {
    try {
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log("Connected successfuly")
        })
    } catch (error) {
        console.log(error);
    }
}
