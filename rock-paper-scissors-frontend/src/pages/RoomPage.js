import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import GameScreen from "../components/GameScreen/GameScreen";
import HandOptions from "../components/HandOptions/HandOptions";
import "./RoomPage.css";
import Sidebar from "../components/Sidebar/Sidebar";

let socket;

const RoomPage = () => {
	const ENDPOINT = "localhost:5002";
	const [sideBar, setSideBar] = useState(false);
	const [theme, setTheme] = useState("classic");
	const [user, setUser] = useState();
	const [users, setUsers] = useState(0);
	const [mode, setMode] = useState("prep");
	const [gameReady, setGameReady] = useState(false);
	const [roomState, setRoomState] = useState("none");
	const [res, setRes] = useState(undefined);
	const [score, setScore] = useState({
		mywins: 0,
		opWins: 0,
	});


	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on("leftRoom", ({ players }) => {
			setMode('prep');
			setUsers([...players]);
			console.log('user left room');
		});

		socket.on("userJoined", ({ username, roomName, players }) => {
			setUsers([...players]);
			setRoomState(roomName);
			console.log(users, username, roomName);
		});

		socket.on("gameReady", () => {
			setMode("time");
		});

		socket.on("results", results => {
			let result;
			setRes(results);
			console.log("halobaba");
			if (socket.id === results[0].socketID) {
				result = results[0].result;
			} else if (socket.id === results[1].socketID) {
				result = results[1].result;
			}

			setScore({
				...score,
				result,
			});

			setMode("result");
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, []);


	const selectRoom = e => {
		setSideBar(true);
	};


	const joinRoom = (username, roomName, e) => {
		setMode('prep');

		e.preventDefault();

		console.log(username, roomName);

		setUser({ roomName, username });

		socket.emit("leaveRoom");

		socket.emit("joinRoom", { roomName, username });

		setSideBar(false);

		if (username === "Robin" || username === "Batman") setTheme("batman");
	};


	const userReady = () => {
		socket.emit("userReady", user.roomName);
	};


	const sendResult = result => {
		if (user.username && user.roomName && mode === "fight") {
			socket.emit("result", {
				result,
				username: user.username,
				roomName: user.roomName,
			});
		}
	};


	return (
		<div className='main'>
			<div className='room-btn' onClick={() => selectRoom()}>
				<h3>Room : {roomState}</h3>
			</div>

			<div className='roomContainer'>
				<div
					className={`${sideBar ? "sidebar-open" : "sidebar-container"
						} `}
				>
					<Sidebar
						joinRoom={joinRoom}
						theme={theme}
						setTheme={setTheme}
					/>
				</div>
				{user ? (
					<div className='room-board'>
						<HandOptions
							player={2}
							sendResult={sendResult}
							theme={theme}
							color={'red'}
						/>
						<GameScreen
							mode={mode}
							setMode={setMode}
							userReady={userReady}
							user={user}
							users={users}
							score={score}
							results={res}
							socketID={socket.id}
							gameReady={gameReady}
							theme={theme}
						/>
						<HandOptions
							player={1}
							sendResult={sendResult}
							theme={theme}
							mode={mode}
							color={"blue"}
						/>
					</div>
				) : (
						<h1 className='room-board enter-room'>Enter Room!</h1>
					)}

				{/* <div className='sidebar-info-container'>
					<div className='roomInformation'>
						<h2 className='roomName__info'>
							Room: {user ? user.roomName : ""}
						</h2>
						<h3 className='playes_info'>
							Players: {users ? users.length : users}
						</h3>
					</div>
				</div> */}
			</div>
		</div>
	);
};

export default RoomPage;
