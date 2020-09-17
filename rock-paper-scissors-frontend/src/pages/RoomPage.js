import React from "react";
import GameScreen from "../components/GameScreen";
import HandOptions from "../components/HandOptions";
import { Link } from "react-router-dom";

const RoomPage = () => {
	return (
		<div className='roomContainer'>
			<Link to='/'>Home</Link>
			<GameScreen />
			<HandOptions />
		</div>
	);
};

export default RoomPage;
