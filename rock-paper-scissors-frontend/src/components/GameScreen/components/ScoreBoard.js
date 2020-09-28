import React, { useState, useEffect } from "react";

import "./ScoreBoard.css";

export default function ScoreBoard({
	scoreB,
	setScoreB,
	user,
	results,
	socketID,
}) {
	useEffect(() => {
		let result;
		if (results) {
			if (socketID === results[0].socketID) {
				result = results[0].result;
			} else if (socketID === results[1].socketID) {
				result = results[1].result;
			}

			if (result === "win") {
				let points = scoreB.user + 1;
				console.log("I won", points);
				setScoreB({ ...scoreB, user: points });
			} else if (result === "draw") {
				let points = scoreB.draw + 1;
				setScoreB({ ...scoreB, draw: points });
			} else {
				let points = scoreB.opponent + 1;
				console.log("I lost", points);
				setScoreB({ ...scoreB, opponent: points });
			}
		}
	}, [results]);

	return (
		<div className='score-container'>
			<div className='score sw'>{scoreB.user}</div>
			<div className='score sd'>{scoreB.draw}</div>
			<div className='score sl'>{scoreB.opponent}</div>
		</div>
	);
}
