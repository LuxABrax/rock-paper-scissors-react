import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import GameScreen from "../components/GameScreen";
import HandOptions from "../components/HandOptions";
import { Link } from "react-router-dom";

let socket;

const RoomPage = ({ location }) => {
	const ENDPOINT = "localhost:5002";
	const [room, setRoom] = useState({ roomName: "", players: [] });

	useEffect(() => {
		const { room, username } = queryString.parse(location.search);
		console.log(room, username);
		socket = io(ENDPOINT);

		setRoom({ roomName: room, players: [username] });

		socket.emit("joinRoom", { roomName: room, username }, () => {
			console.log(room, username);
		});

		return () => {
			socket.emit("disconnect");
			socket.off();
		};
	}, [ENDPOINT, location.seach]);

	//! Timer !
	const [counter, setCounter] = useState(10);
	useEffect(() => {
		const timer =
			counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	}, [counter]);

	return (
		<div className='roomContainer'>
			<Link to='/'>Home</Link>
			<HandOptions />
			<h1 className='timer'>{counter}</h1>
			<GameScreen />
			<HandOptions />
		</div>
	);
};

export default RoomPage;
