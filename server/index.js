const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { userJoin } = require('./utils.js');

const PORT = process.env.PORT || 5002;


const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {

    socket.on('joinRoom', (roomName, username) => {

        let user = userJoin(socket.id, roomName, username);

        if (user.error) {
            socket.emit('username already taken');
            return socket.disconnect(true);
        }

        socket.emit('user joined');

    })
    /* socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        if(user.error) {
            
        }
    }) */

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(PORT, () => {
    console.log('server has started on port', PORT);
});