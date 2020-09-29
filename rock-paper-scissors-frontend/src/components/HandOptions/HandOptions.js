import React, { useState, useEffect } from "react";
import "./HandOptions.css";
const HandOptions = ({ player, sendResult, mode }) => {
	const [active, setActive] = useState("none");
	const [clickable, setClickable] = useState(true);


	/* makes components clickable again when result is shown, the sendResult function in roompage can 
	| can only send whend mode === fight, so no need yo check it here
	*/
	useEffect(() => {
		if (mode === 'result') setClickable(!clickable);
	}, [mode]);

	return (
		<div className={`HandOptions player${player}`}>
			<div
				className={`Hand pos1 ${clickable ? '' : 'signNotClickable'} ${active === "rock" ? "active" : ""}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("rock");
						sendResult("rock");
						setClickable(!clickable);
					}
				}}
			>
				<img src='/images/poopPoop.jpg' alt='rock' />
			</div>
			<div
				className={`Hand pos1 ${clickable ? '' : 'signNotClickable'} ${active === "paper" ? "active" : ""}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("paper");
						sendResult("paper");
						setClickable(!clickable);
					}
				}}
			>
				<img src='/images/poopPaper.jpg' alt='paper' />
			</div>
			<div
				className={`Hand pos1 ${clickable ? '' : 'signNotClickable'} ${active === "scissors" ? "active" : ""}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("scissors");
						sendResult("scissors");
						setClickable(!clickable);
					}
				}}
			>
				<img src='/images/pissScis.jpg' alt='scissors' />
			</div>
		</div>
	);
};

export default HandOptions;
