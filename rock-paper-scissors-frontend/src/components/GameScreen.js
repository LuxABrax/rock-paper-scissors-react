import React, { useEffect, useState } from "react";
import "./GameScreen.css";
const GameScreen = ({
	mode,
	setMode,
	userReady,
	user,
	users,
	score,
}) => {
	//const [counter, setCounter] = useState(0);
	const [round, setRound] = useState(1);
	const [counter, setCounter] = useState(3);
	//let counter = 3;


	const startTimer = () => {
		let timer = setInterval(() => {

			setCounter(counter - 1);

			if (counter === 0) {
				setMode('fight');
				clearInterval(timer);
			}

		}, 1000);
	}

	/* 	useEffect(() => {
			const timer =
				counter > 0 &&
				setInterval(() => {
					//setCounter(counter - 1);
					if (counter === 0) setMode("fight");
				}, 1000);
			return () => {
				clearInterval(timer);
			};
		}, [counter]); */

	let comp;

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
			comp = <h1>Waiting for opponent...</h1>;
			break;

		case "time":
			//setCounter(5);
			startTimer();
			comp = <h1 className='timer'>{counter}</h1>;
			break;

		case "fight":
			comp = <h1>Choose your hand</h1>;
			break;

		case "result":
			comp = <h1>{score.result === 'win' ? "You Win!" : "You Lose!"}</h1>;

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
				<div className='score-container'>
					{`${score.myWins} : ${score.opWins}`}
				</div>
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
	{
		/* <div className='time'>
			<div className='cTimer'>
				<button
					onClick={() => {
						setCounter(5);
					}}
				>
					start
				</button>
				<h1 className='timer'>{counter}</h1>
			</div> */
	}
};

export default GameScreen;
