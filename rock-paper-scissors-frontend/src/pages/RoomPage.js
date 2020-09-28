import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import GameScreen from "../components/GameScreen/GameScreen";
import HandOptions from "../components/HandOptions";
import { Link } from "react-router-dom";
import "./RoomPage.css";
import Sidebar from "../components/Sidebar";

let socket;

const RoomPage = ({ location }) => {
	const ENDPOINT = "localhost:5002";
	const [sideBar, setSideBar] = useState(false);
	const [user, setUser] = useState();
	const [users, setUsers] = useState(0);
	//const [active, setActive] = useState("none");
	const [mode, setMode] = useState("prep");
	const [gameReady, setGameReady] = useState(false);
	const [roomState, setRoomState] = useState("none");

	const [res, setRes] = useState(undefined);
	const [score, setScore] = useState({
		mywins: 0,
		opWins: 0,
	});
	const [scoreB, setScoreB] = useState({ user: 0, opponent: 0, draw: 0 });
	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on("leftRoom", ({ players }) => {
			console.log(players);
			setUsers([...players]);
		});

		socket.on("userJoined", ({ username, roomName, players }) => {
			setUsers([...players]);
			setRoomState(roomName);
			console.log(users, username, roomName);
		});
		socket.on("gameReady", () => {
			//setGameReady(true);
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
			if (result === "win") {
				console.log("I won");
				//setPoints([points[0] + 1, points[1]]);
			} else {
				console.log("I lost");
				//setPoints([points[0], points[1] + 1]);
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
		e.preventDefault();
		console.log(username, roomName);
		setUser({ roomName, username });
		socket.emit("leaveRoom");

		socket.emit("joinRoom", { roomName, username }, () => {
			/* setUsers([...users, username]); */
		});
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
					className={`${
						sideBar ? "sidebar-open" : "sidebar-container"
					}`}
				>
					<Sidebar joinRoom={joinRoom} />
				</div>
				{user ? (
					<div className='room-board'>
						<HandOptions player={2} sendResult={sendResult} />
						<GameScreen
							mode={mode}
							setMode={setMode}
							userReady={userReady}
							user={user}
							users={users}
							score={score}
							results={res}
							socketID={socket.id}
							scoreB={scoreB}
							setScoreB={setScoreB}
						/>
						<HandOptions
							player={1}
							sendResult={sendResult}
							mode={mode}
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
