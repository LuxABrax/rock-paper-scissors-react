const rooms = [];


//check if user exists in rooms
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
}

module.exports = {
    userJoin
}


const createRoom = (roomName) => {
    let exists;

    rooms.forEach(room => {
        if (room.name === roomName) exists = true;
    });

    if (exists) return 'room already exists';

    rooms.push({ name: roomName, users: [] });

    return { name: roomName, users: [] };
}

const addUser = (username, roomName, socketID) => {

    rooms.forEach(room => {
        if (room.name === roomName) {
            if (checkUser(username, roomName)) {
                room.users.push({ username, roomName, socketID });
            }
        }
    });

    return { username, roomName, socketID };

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


console.log(createRoom('room'));
console.log(createRoom('room'));

//addUser('getrobin', 'room', 'id');
console.log(addUser('getrobin', 'room', 'id'));
console.log(rooms);
