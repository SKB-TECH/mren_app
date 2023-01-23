let io;
module.exports = {
    init: httpServer => {
        io = require('socket.io')(httpServer, {
            cors: {
                origin: "*", credentials: true
            }
        });
        return io;
    },
    getIo: () => {
        if (!io) {
            throw Error('io is not initialize !!')
        }
        return io;
    }
}