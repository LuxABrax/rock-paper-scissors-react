import React, { useState, useEffect } from "react";
import "./HandOptions.css";

import Hand from "./Hand/Hand";

/*
MAKE BACKGROUND AND CREATE HAND COMPONENT
*/

const HandOptions = ({ player, sendResult, theme, mode, color }) => {
	const [clickable, setClickable] = useState(true);
	const [active, setActive] = useState("none");
	/* 
	 */
	//const [signs, setSigns] = useState(['paper', 'scissors', 'rock']);
	const [signs, setSigns] = useState([
		{ sign: "rock", img: "images/rock-basic.png" },
		{ sign: "paper", img: "/images/paper-basic.png" },
		{ sign: "scissors", img: "/images/scissors-basic.png" },
	]);

	useEffect(() => {
		if (mode === "time") setClickable(true);
		if (mode === 'prep') setActive(false);
	}, [mode]);



	return (
		<div className={`handOptions__outerContainer player${player}`}>
			<div className={`handOptions__innerContainer ${color}`}>
				{signs.map(sign => (
					<Hand
						sendResult={sendResult}
						sign={sign.sign}
						img={sign.img}
						mode={mode}
						color={color}
						clickable={clickable}
						setClickable={setClickable}
						setActive={setActive}
						active={active}
					/>
				))}
			</div>
		</div>
	);
};

export default HandOptions;
