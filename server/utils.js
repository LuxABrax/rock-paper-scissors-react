const rooms = [];

const userJoin = (socketID, username, roomName) => {

    const userExists;

    rooms.forEach(oneRoom => {
        if (oneRoom.name === roomName) {
            if (!userExists(users, username)) {
                room.users.push({ socketID, username, roomName });
                break;
            } else {
                userExists = true;
            }
        }
    })

    if (userExists) return { error: 'username already taken', user: { socketID, username, roomName } };

    return { socketID, username, roomName };
}


//INTERNAL FUNCTIONS
const userExists = (users, username) => {

    return users.some((user, index, arr) => {
        return user === username;
    });
}


}


const getRoom = (roomName) => {
    const room = rooms.forEach(room => {
        if (room.name === roomName) return room;
    })

    if (room != null) return room;

    return false;
}
