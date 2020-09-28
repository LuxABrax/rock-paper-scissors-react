import React, { useEffect, useState } from "react";
import "./GameScreen.css";
import Timer from "./components/Timer";
import ScoreBoard from "./components/ScoreBoard";
const GameScreen = ({
	mode,
	setMode,
	userReady,
	user,
	users,
	score,
	results,
	socketID,
	gameReady
}) => {

	const [round, setRound] = useState(1);
	const [seconds, setSeconds] = useState(3);
	const [isActive, setIsActive] = useState(true);

	function reset() {
		setIsActive(false);
	}


	let comp;

	const displayResult = result => {
		if (result === "draw") return "Draw!";
		if (result === "win") return "You Won!";
		if (result === "loss") return "You Lost!";
	};

	switch (mode) {
		case "prep":
			comp = (
				<button
					className='timer'
					onClick={() => {
						userReady();
						setMode("wait");
					}}
				>
					Ready
				</button>
			);
			break;

		case "wait":
			if (!gameReady) comp = <h1>Waiting for opponent...</h1>;
			break;

		case "time":
			//setCounter(5);
			comp = (
				<Timer
					isActive={isActive}
					setIsActive={setIsActive}
					setMode={setMode}
				/>
			);
			break;

		case "fight":
			comp = <h1>Choose your hand</h1>;
			break;

		case "result":
			comp = (
				<>
					<h1>{displayResult(score.result)}</h1>
					<button
						className='timer'
						onClick={() => {
							userReady();
							setMode("wait");
						}}
					>
						play again
					</button>
				</>
			);

		default:
			break;
	}

	return (
		<div className='gameContainer'>
			<div className='column'>
				<div className='userTitle myName'>{user.username}</div>
			</div>
			<div className='column scoreBoard'>
				<div className='vS'>VS</div>
				<div className='scoreBoard-comp'>
					{comp ? comp : "Enter Room"}
				</div>
				<ScoreBoard classname="score" user={user} results={results} socketID={socketID} />
			</div>
			<div className='column'>
				<div className='userTitle opName'>
					{users[0] && users[1]
						? users[0].username === user.username
							? users[1].username
							: users[0].username
						: "Opponent"}
				</div>
			</div>
		</div>
	);
};

export default GameScreen;
