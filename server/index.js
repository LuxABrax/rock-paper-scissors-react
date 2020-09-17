const queryString = require('query-string');

const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const PORT = process.env.PORT || 5000;


const router = require('./router.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {

    query = queryString.parse(location.search);

    socket.on('joining', () => {


        socket.join(query.roomName, () => {
            io.to(roomName).emit(`${query.username} has joined the chat`);
        });

    })
    /* socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        if(user.error) {
            
        }
    }) */
})