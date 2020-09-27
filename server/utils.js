let rooms = [];

/* //check if user exists in rooms
const userExists = (users, username) => {
    if (users.length !== 0) {
        return users.some((user, index, arr) => {
            return user === username;
        });
    } else {
        return false;
    }
}

//puts the user in the room if the username isnt taken
const userJoin = (socketID, roomname, username) => {

    let userExists;

    if (rooms.length !== 0) {
        rooms.forEach(oneRoom => {
            if (oneRoom.name === roomname) {
                if (!userExists(room.users, username) && oneRoom.users.length <= 2) {
                    room.users.push({ socketID, username, roomname });
                    return
                } else {
                    userExists = true;
                }
            }
        })
    }
    console.log(rooms);
    if (userExists) return { error: 'username already taken or room full', user: { socketID, username, roomname } };

    return { socketID, username, roomname };
}


//INTERNAL FUNCTIONS




//gets one room, requires a roomname
const getRoom = (roomName) => {
    const room = rooms.forEach(room => {
        if (room.name === roomName) return room;
    })

    if (room != null) return room;

    return false;
} */
const addUserInput = (input, socketID) => {};
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

/* const removeUser = (username, roomName) => {

    rooms.forEach(room => {
        if (room.name === roomName) {
            room.users = room.users.filter(user => user.username !== username);
        }
    });


} */

const getUser = socketID => {
	let user;
	rooms.forEach(room => {
		user = room.users.find(user => user.socketID === socketID);
	});

	if (user) return user;

	return undefined;
};
const userReady = roomname => {
	let oneRoom;

	rooms.forEach(room => {
		if (room.name === roomname) {
			if (!room.que) room.que = 0;
			room.que = room.que + 1;
			oneRoom = room;
		}
	});

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

/* RESULT CALC */

/* const calcResult = (result, socketID) => {
    if (user)
}; */

const calcResult = (userInput, opponentInput) => {
	let result = { userWon: false, opponentWon: false };
	switch (userInput) {
		case "rock":
			if (opponentInput === "paper") result.opponentWon = true;
			if (opponentInput === "scissor") result.userWon = true;
			break;
		case "paper":
			if (opponentInput === "rock") result.userWon = true;
			if (opponentInput === "scissor") result.opponentWon = true;
			break;
		case "scissor":
			if (opponentInput === "rock") result.opponentWon = true;
			if (opponentInput === "paper") result.userWon = true;
			break;
		default:
	}

	return result;
};

const storeInput = (input, username, roomName) => {
	let results = {
		my: "",
		opp: "",
	};
	rooms.forEach(room => {
		if (room.name === roomName) {
			room.users.forEach(user => {
				if (user.username === username) {
					user.input = input;
					results.my = user.input;
				} else {
					results.opp = user.input;
				}
			});
		}
	});
	return results;
};
// const getInput = (roomName, username) =>{
//     let results={
//         my:'',
//         opp:''
//     }
//     rooms.forEach(room => {
//         if(room.name === roomName){
//             room.users.forEach(user =>{
//                 if (user.username === username) {
//                     results.my = user.input;
//                 } else {
//                     results.opp = user.input;
//                 }
//             })
//         }
//     })
//     console.log(results)
// }

const validateInput = () => {};

/* ----END RESULT CALC----- */
/*
console.log(createRoom("room"));
console.log(createRoom("room"));

//addUser('getrobin', 'room', 'id');
console.log(addUser("getrobin", "room", "id"));
console.log(addUser("getrobin", "room", "id"));
console.log(addUser("getrobin1", "room", "id1"));
storeInput("rock", "getrobin", "room");
storeInput("paper", "getrobin1", "room");
//console.log(removeUser('id'));
//removeRoom('room');
console.log(getRoom("room"));
console.log(rooms[0].users);
console.log(rooms);*/

module.exports = {
	addPlayerToRoom,
	removeUser,
	getRoom,
	getUser,
	storeInput,
	calcResult,
	updateUserInput,
	userReady,
};
