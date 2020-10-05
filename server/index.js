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
	userReady,
	storeRoom
} = require("./utils.js");

const PORT = process.env.PORT || 5002;

const router = require("./router.js");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connection", socket => {


	socket.on("leaveRoom", () => {
		let user = getUser(socket.id);

		if (user) {
			removeUser(socket.id);
			let room = getRoom(user.roomName);
			socket.to(room.name).emit("leftRoom", { players: room.users });
			socket.leave(room.name);
		}
	});

	socket.on("joinRoom", ({ roomName, username }) => {
		let user = addPlayerToRoom(socket.id, username, roomName);



		if (user.error || !username || !roomName) {
			socket.emit("err", user.error);
			return socket.disconnect(true);
		}

		socket.join(user.user.roomName);


		let room = getRoom(roomName);

		console.log(room);
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


	});

	socket.on("userReady", roomName => {
		const room = userReady(roomName);
		if (room.que === 2) {
			socket.to(roomName).emit("gameReady");
			socket.emit("gameReady");
			room.que = 0;
			storeRoom(room);
		}
	});

	socket.on("result", ({ result, username, roomName }) => {

		let room = storeInput(result, username, roomName, socket.id);

		if (room.inputs.length === 2) {

			let result = calcResult(room.inputs[0], room.inputs[1]);

			socket.to(roomName).emit('results', result);
			socket.emit('results', result);

			room.inputs = [];
			storeRoom(room);

		}


		console.log(result, username, roomName);
	});

	socket.on("disconnect", () => {
		let user = getUser(socket.id);

		if (user) console.log(`${user.username} disconnected ${user.roomName}`);

		removeUser(socket.id);
	});
});

server.listen(PORT, () => {
	console.log("server has started on port", PORT);
});
