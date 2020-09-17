import React, { useEffect } from "react";
import io from "socket.io-client";
import queryStream from "query-stream";
import GameScreen from "../components/GameScreen";
import HandOptions from "../components/HandOptions";
import { Link } from "react-router-dom";

const RoomPage = () => {
	useEffect(() => {
		const { room, username } = queryStream.parse(location.search);
	}, []);
	return (
		<div className='roomContainer'>
			<Link to='/'>Home</Link>
			<HandOptions />
			<GameScreen />
			<HandOptions />
		</div>
	);
};

export default RoomPage;
