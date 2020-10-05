import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import GameScreen from "../components/GameScreen/GameScreen";
import HandOptions from "../components/HandOptions/HandOptions";
import "./RoomPage.css";
import Sidebar from "../components/Sidebar/Sidebar";
import OpponentHand from '../components/HandOptions/OpponentHand/OpponentHand.js'

let socket;

const RoomPage = () => {
	const ENDPOINT = "localhost:5002";
	const [sideBar, setSideBar] = useState(false);
	const [user, setUser] = useState();
	const [users, setUsers] = useState(0);
	const [mode, setMode] = useState("prep");
	const [gameReady, setGameReady] = useState(false);
	const [roomState, setRoomState] = useState("none");
	const [res, setRes] = useState(undefined);
	const [opponentRes, setOpponentRes] = useState(undefined);
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
			if (socket.id === results[0].socketID) {
				result = results[0].result;
				setOpponentRes(results[1].input);
			} else if (socket.id === results[1].socketID) {
				result = results[1].result;
				setOpponentRes(results[0].input);
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

		setUser({ roomName, username });

		socket.emit("leaveRoom");

		socket.emit("joinRoom", { roomName, username });

		setSideBar(false);


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
					/>
				</div>
				{user ? (
					<div className='room-board'>
						<OpponentHand opponentRes={opponentRes} mode={mode} />
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

						/>
						<HandOptions
							player={1}
							sendResult={sendResult}
							mode={mode}
							color={"blue"}
						/>
					</div>
				) : (
						<h1 className='room-board enter-room'>Enter Room!</h1>
					)}
			</div>
		</div>
	);
};

export default RoomPage;
