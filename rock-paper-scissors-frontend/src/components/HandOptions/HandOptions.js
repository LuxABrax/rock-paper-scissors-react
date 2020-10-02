import React, { useState, useEffect } from "react";
import "./HandOptions.css";
const HandOptions = ({ player, sendResult, theme, mode }) => {
	const [active, setActive] = useState("none");
	const [clickable, setClickable] = useState(true);
	const [handTheme, setHandTheme] = useState({
		rock: "/images/rock-classic.jpg",
		paper: "/images/paper-classic.jpg",
		scis: "/images/scis-classic.jpg",
	});

	/* makes components clickable again when result is shown, the sendResult function in roompage can
	| can only send whend mode === fight, so no need yo check it here
	*/

	useEffect(() => {
		if (mode === "result") setClickable(!clickable);
	}, [mode]);
	useEffect(() => {
		switch (theme) {
			case "classic":
				setHandTheme({
					rock: "/images/rock-classic.jpg",
					paper: "/images/paper-classic.jpg",
					scis: "/images/scis-classic.jpg",
				});
				break;
			case "poop":
				setHandTheme({
					rock: "/images/rock-poop.jpg",
					paper: "/images/paper-poop.jpg",
					scis: "/images/scis-poop.jpg",
				});
				break;
			case "batman":
				setHandTheme({
					rock: "/images/rock-batman.jpg",
					paper: "/images/paper-batman.jpg",
					scis: "/images/scis-batman.jpg",
				});
				break;
		}
	}, [theme]);
	return (
		<div className={`HandOptions player${player}`}>
			<div
				className={`Hand pos1 ${clickable ? "" : "signNotClickable"} ${
					active === "rock" ? "active" : ""
				}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("rock");
						sendResult("rock");
						setClickable(!clickable);
					}
				}}
			>
				<img src={handTheme.rock} alt='rock' />
			</div>
			<div
				className={`Hand pos1 ${clickable ? "" : "signNotClickable"} ${
					active === "paper" ? "active" : ""
				}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("paper");
						sendResult("paper");
						setClickable(!clickable);
					}
				}}
			>
				<img src={handTheme.paper} alt='paper' />
			</div>
			<div
				className={`Hand pos1 ${clickable ? "" : "signNotClickable"} ${
					active === "scissors" ? "active" : ""
				}`}
				onClick={() => {
					if (mode === "fight") {
						setActive("scissors");
						sendResult("scissors");
						setClickable(!clickable);
					}
				}}
			>
				<img src={handTheme.scis} alt='scissors' />
			</div>
		</div>
	);
};

export default HandOptions;
