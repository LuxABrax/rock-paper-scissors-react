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



const addPlayerToRoom = (socketID, username, roomName) => {

    createRoom(roomName);
    let user = addUser(username, roomName, socketID);

    if (typeof user === 'string') return { error: user };

    return user


}


const createRoom = (roomName) => {
    let exists;

    rooms.forEach(room => {
        if (room.name === roomName) exists = true;
    });

    if (exists) return { created: false };

    rooms.push({ name: roomName, users: [] });

    return { room: { name: roomName, users: [] }, created: true };
}

const addUser = (username, roomName, socketID) => {

    let valid = checkUser(username, roomName);

    if (!valid) return 'username taken!';

    rooms.forEach(room => {
        if (room.name === roomName) {
            room.users.push({ username, roomName, socketID });
        }
    });

    return { username, roomname: roomName, socketID };

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
}

const removeUser = (username, roomName) => {

    rooms.forEach(room => {
        if (room.name === roomName) {
            room.users = room.users.filter(user => user.username !== username);
        }
    });


}

const removeRoom = (roomName) => {

    rooms = rooms.filter(room => room.name !== roomName);

    return rooms;
};

/* 
console.log(createRoom('room'));
console.log(createRoom('room'));

//addUser('getrobin', 'room', 'id');
console.log(addUser('getrobin', 'room', 'id'));
console.log(addUser('getrobin', 'room', 'id'));
//console.log(removeUser('getrobin', 'room'));
//removeRoom('room');
console.log(rooms[0].users);
console.log(rooms);
 */

module.exports = {
    addPlayerToRoom
}
