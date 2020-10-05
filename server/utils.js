
let rooms = [];


const updateUserInput = (socketID, input) => {
	let success = false;

	rooms.forEach(room => {
		room.users.forEach(user => {
			if (user.socketID === socketID) {
				user.input = input;
				success = true;
			}
		});
	});

	return success;
};


const getRoom = roomName => {
	let room;
	rooms.forEach(oneRoom => {
		if (oneRoom.name === roomName) room = oneRoom;
	});

	if (!room) return "Not Found!";

	return room;
};


const addPlayerToRoom = (socketID, username, roomName) => {
	createRoom(roomName);
	let user = addUser(username, roomName, socketID);
	console.log(rooms);
	if (user.error) return { error: user.error };

	return user;
};


const checkPlayersInRoom = roomName => {
	let gameReady = false;

	rooms.forEach(room => {
		if (room.name === roomName && room.users.length >= 2) gameReady = true;
	});

	return gameReady;
};


const createRoom = roomName => {
	let exists;

	rooms.forEach(room => {
		if (room.name === roomName) exists = true;
	});

	if (exists) return { created: false };

	rooms.push({ name: roomName, users: [] });

	return { room: { name: roomName, users: [] }, created: true };
};


const addUser = (username, roomName, socketID) => {
	let valid = checkUser(username, roomName);

	if (!valid)
		return {
			error: "username taken",
			user: { username, roomName, socketID },
		};

	rooms.forEach(room => {
		if (room.name === roomName) {
			room.users.push({ username, roomName, socketID });
		}
	});

	if (checkPlayersInRoom(roomName))
		return { gameReady: true, user: { username, roomName, socketID } };

	return { user: { username, roomName, socketID } };
};


const checkUser = (username, roomName) => {
	let oneRoom = false;

	rooms.forEach(room => {
		if (room.name === roomName) oneRoom = room;
	});

	if (!oneRoom) return true; //return true meaning username is good

	let exists;

	oneRoom.users.forEach(user => {
		if (user.username === username) exists = true;
	});

	if (exists) return false; //username is taken

	return true;
};


const getUser = socketID => {
	let user;
	rooms.forEach(room => {
		user = room.users.find(user => user.socketID === socketID);
	});

	if (user) return user;

	return undefined;
};


const userReady = roomname => {
	console.log("room: ", roomname);
	let oneRoom;

	rooms.forEach(room => {
		if (room.name === roomname) {
			if (!room.que) room.que = 0;
			room.que = room.que + 1;
			console.log(room.que);
			oneRoom = room;
		}
	});
	console.log("one room: ", oneRoom);
	return oneRoom;
};

const removeUser = socketID => {
	rooms.forEach(room => {
		room.users = room.users.filter(user => user.socketID !== socketID);
	});

	return rooms;
};

const removeRoom = roomName => {
	rooms = rooms.filter(room => room.name !== roomName);

	return rooms;
};


const calcResult = (input1, input2) => {
	input1.result = 'loss';
	input2.result = 'win';

	if (input1.input === input2.input) {
		input1.result = 'draw';
		input2.result = 'draw';

		return [input1, input2];
	}

	switch (input1.input) {
		case "rock":
			if (input2.input === "scissors") {
				input1.result = 'win';
				input2.result = 'loss';
			}
			break;
		case "paper":
			if (input2.input === "rock") {
				input1.result = 'win';
				input2.result = 'loss';
			}
			break;
		case "scissors":
			if (input2.input === "paper") {
				input1.result = 'win';
				input2.result = 'loss';
			}
			break;
		default:
	}

	return [input1, input2];
};

const storeRoom = (room) => {
	rooms.forEach(oneRoom => {
		if (oneRoom.name === room.name) {
			oneRoom = room;
		}
	});

	return room;
}

const storeInput = (input, username, roomName, socketID) => {

	let room = getRoom(roomName);

	console.log(roomName, 'roomname jas', room);


	if (!room.inputs) room.inputs = [];
	room.inputs = [...room.inputs, { socketID, input }];


	return room;
};



module.exports = {
	addPlayerToRoom,
	removeUser,
	getRoom,
	getUser,
	storeInput,
	calcResult,
	userReady,
	storeRoom
};


