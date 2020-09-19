import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import GameScreen from "../components/GameScreen";
import HandOptions from "../components/HandOptions";
import { Link } from "react-router-dom";
import "./RoomPage.css";
import Sidebar from "../components/Sidebar";

let socket;

const RoomPage = ({ location }) => {
	const ENDPOINT = "localhost:5002";
	const [room, setRoom] = useState({ roomName: "", players: [] });
	const [user, setUser] = useState({ roomName: "", userName: "" });
	useEffect(() => {
		socket = io(ENDPOINT);

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [ENDPOINT]);

	const joinRoom = (username, roomName) => {
		setUser({ roomName, username });
		socket.emit("joinRoom", { roomName, username }, () => {
			console.log(room, username);
		});
	};
	//! Timer !

	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

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
					<Sidebar value={joinRoom} />
				</div>
				<div className='room-board'>
					<HandOptions player={2} />
					<GameScreen />
					<HandOptions player={1} />
				</div>
				<div className='sidebar-info-container'>
					<Sidebar value={joinRoom} />
				</div>
			</div>
		</div>
	);
};

export default RoomPage;
