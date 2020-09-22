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
	const [hands, setHands] = useState(0);
	const [user, setUser] = useState();
	const [users, setUsers] = useState(0);
	const [counter, setCounter] = useState(0);
	const [active, setActive] = useState("none");

	useEffect(() => {
		socket = io(ENDPOINT);

		socket.on("gameReady", message => {
			console.log(message, "gjhghg");
		});

		socket.on("leftRoom", ({ players }) => {
			console.log(players);
			setUsers([...players]);
		});

		socket.on("userJoined", ({ username, roomName, players }) => {
			setUsers([...players]);
			console.log(users, username, roomName);
		});

		socket.on("results", ({ myResult, opponentResult }) => {
			console.log("my:", myResult);
			console.log("opp:", opponentResult);
			console.log(`me: ${myResult}, he: ${opponentResult}`);
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, []);

	const joinRoom = (username, roomName, e) => {
		e.preventDefault();
		console.log(username, roomName);
		setUser({ roomName, username });
		socket.emit("leaveRoom");

		socket.emit("joinRoom", { roomName, username }, () => {
			/* setUsers([...users, username]); */
		});
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

	/* useEffect(() => {
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]); */

	return (
		<div className='main'>
			<Link to='/'>
				<button className='home-btn'>Home</button>
			</Link>
			<div className='cTimer'>
				<button
					onClick={() => {
						setCounter(5);
					}}
				>
					start
				</button>
				<h1 className='timer'>{counter}</h1>
			</div>
			<div className='roomContainer'>
				<div className='sidebar-container'>
					<Sidebar joinRoom={joinRoom} />
				</div>
				{user ? (
					<div className='room-board'>
						<HandOptions
							player={2}
							sendResult={sendResult}
							active={active}
						/>
						<GameScreen />
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
