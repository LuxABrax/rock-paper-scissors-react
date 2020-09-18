const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addPlayerToRoom } = require('./utils.js');

const PORT = process.env.PORT || 5002;


const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {

    socket.on('joinRoom', ({ roomName, username }) => {
        console.log(roomName)

        let user = addPlayerToRoom(socket.id, username, roomName);

        //logger
        console.log(user);

        if (user.error || !username || !roomName) {
            socket.emit('err', user.error);
            return socket.disconnect(true);
        }

        socket.join(user.roomname);
        socket.broadcast
            .to(user.roomname)
            .emit(
                'message',
                `${user.username} has joined room: ${user.roomname}`
            );

    });




    socket.on('disconnect', ({ username, roomname }) => {
        console.log(`${username} disconnected`);
    });
})

server.listen(PORT, () => {
    console.log('server has started on port', PORT);
});