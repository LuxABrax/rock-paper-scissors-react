import React from "react";
import "./GameScreen.css";
const GameScreen = ({ input }) => {
	return (
		<div className='gameContainer'>
			<div className='positions'>
				<div className='position pl1'>{input ? input : ''}</div>
				<div className='position pl2'>{input ? input : ''}</div>
			</div>
		</div>
	);
};

export default GameScreen;
