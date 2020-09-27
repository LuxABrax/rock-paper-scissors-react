import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import GameScreen from "../components/GameScreen";
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
	const [active, setActive] = useState("none");
	const [mode, setMode] = useState("prep");
	const [gameReady, setGameReady] = useState(false);

	const [result, setResult] = useState({
		myWins: 0,
		opWins: 0,
	});

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on("leftRoom", ({ players }) => {
			console.log(players);
			setUsers([...players]);
		});

		socket.on("userJoined", ({ username, roomName, players }) => {
			setUsers([...players]);
			console.log(users, username, roomName);
		});
		socket.on("gameReady", () => {
			setGameReady(true);
			setMode("time");
		});

		socket.on("results", ({ iWin, myResult, opponentResult }) => {
			if (iWin) {
				console.log("I won");
				setResult({
					...result,
					myWins: result.myWins + 1,
				});
			} else {
				console.log("I lost");
				setResult({
					...result,
					opWins: result.opWins + 1,
				});
			}
			setResult({
				...result,
				iWin,
				myResult,
				opponentResult,
			});
			setMode("result");
			console.log("my:", myResult);
			console.log("opp:", opponentResult);
			console.log(`me: ${myResult}, he: ${opponentResult}`);
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
		setActive(result);
		console.log("result: ", result, " active: ", active);
		if (user.username && user.roomName) {
			console.log(result, user.roomName, user.username);
			socket.emit("result", {
				result,
				username: user.username,
				roomName: user.roomName,
			});
		}
	};

	/* 	const calcResult = (userInput, opponentInput) => {
			let result = { userWon: false, opponentWon: false };
			switch (userInput) {
				case 'rock':
					if (opponentInput === 'paper') result.oponentWon = true;
					if (opponentInput === 'scissor') result.userWon = true;
					break;
				case 'paper':
					if (opponentInput === 'rock') result.userWon = true;
					if (opponentInput === 'scissor') result.opponentWon = true;
					break;
				case 'scissor':
					if (opponentInput === 'rock') result.opponentWon = true;
					if (opponentInput === 'paper') result.userWon = true;
					break;
				default:
			}

			return result;

		} */
	//! Timer !

	return (
		<div className='main'>
			<button className='room-btn' onClick={() => selectRoom()}>
				Room
			</button>

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
						<HandOptions
							player={2}
							sendResult={sendResult}
							active={active}
						/>
						<GameScreen
							mode={mode}
							setMode={setMode}
							userReady={userReady}
							gameReady={gameReady}
							user={user}
							users={users}
							result={result}
						/>
						<HandOptions
							player={1}
							sendResult={sendResult}
							active={active}
						/>
					</div>
				) : (
					<h1 className='room-board enter-room'>Enter Room!</h1>
				)}
				{/* <div className='room-board'>
					<HandOptions player={2} sendResult={sendResult} />
					<GameScreen />
					<HandOptions player={1} sendResult={sendResult} />
				</div> */}
				<div className='sidebar-info-container'>
					<div className='roomInformation'>
						<h2 className='roomName__info'>
							Room: {user ? user.roomName : ""}
						</h2>
						<h3 className='playes_info'>
							Players: {users ? users.length : users}
						</h3>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomPage;
