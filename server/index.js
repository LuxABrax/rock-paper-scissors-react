const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const {
	addPlayerToRoom,
	removeUser,
	getRoom,
	getUser,
	storeInput,
	calcResult,
	updateUserInput,
	userReady,
} = require("./utils.js");

const PORT = process.env.PORT || 5002;

const router = require("./router.js");
const { SSL_OP_NO_TICKET } = require("constants");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connection", socket => {
	console.log("user connected");

	socket.on("leaveRoom", () => {
		let user = getUser(socket.id);

		if (user) {
			removeUser(socket.id);
			let room = getRoom(user.roomName);
			socket.to(user.roomName).emit("leftRoom", { players: room.users });
			socket.leave(user.roomName);
			console.log(`${user.username} left room: ${user.roomName}`);
		}
	});

	socket.on("joinRoom", ({ roomName, username }) => {
		let user = addPlayerToRoom(socket.id, username, roomName);

		//logger

		if (user.error || !username || !roomName) {
			socket.emit("err", user.error);
			return socket.disconnect(true);
		}

		socket.join(user.user.roomName);

		//send back all players in room, current user username and roomName
		let room = getRoom(roomName);

		//emit only emits to current socket, to emits to all users in room exept the user
		socket.to(roomName).emit("userJoined", {
			username: user.user.username,
			roomName: user.user.roomName,
			players: room.users,
		});
		socket.emit("userJoined", {
			username: user.user.username,
			roomName: user.user.roomName,
			players: room.users,
		});

		/* if (user.gameReady) {
            console.log('gameready');
            socket.to(user.user.roomName).emit('gameReady', 'game ready!');
        } */
	});

	socket.on("userReady", roomName => {
		const room = userReady(roomName);
		if (room.que === 2) {
			socket.to(roomName).emit("gameReady");
			socket.emit("gameReady");
			room.que = 0;
		}
	});

	socket.on("result", ({ result, username, roomName }) => {
		//const success = updateUserInput(socket.id, result);
		let results = storeInput(result, username, roomName);
		let rez = calcResult(result, results.opp);

		socket.to(roomName).emit("results", {
			iWin: rez.userWon,
			myResult: results.opp,
			opponentResult: result,
		});

		console.log(result, username, roomName);
	});

	socket.on("disconnect", () => {
		let user = getUser(socket.id);
		if (user) console.log(`${user.username} disconnected ${user.roomName}`);
		console.log("disconnected");
		removeUser(socket.id);
	});
});

server.listen(PORT, () => {
	console.log("server has started on port", PORT);
});
