import React, { useState } from "react";
import "./HandOptions.css";
const HandOptions = ({ player, sendResult, setActive, active }) => {
	//const [active, setActive] = useState('none');

	return (
		<div className={`HandOptions player${player}`}>
			<div
				className={`Hand pos1 ${active === 'rock' ? "active" : ""}`}
				onClick={() => {
					setActive('rock');
					sendResult('rock');
				}
				}
			>
				<img src='/images/poopPoop.jpg' alt='rock' />
			</div>
			<div
				className={`Hand pos1 ${active === 'paper' ? "active" : ""}`}
				onClick={() => {
					setActive('paper');
					sendResult('paper');
					console.log(active);
				}
				}
			>
				<img src='/images/poopPaper.jpg' alt='paper' />
			</div>
			<div
				className={`Hand pos1 ${active === 'scissors' ? "active" : ""}`}
				onClick={() => {
					setActive('scissors');
					sendResult('scissors');
				}
				}
			>
				<img src='/images/pissScis.jpg' alt='scissors' />
			</div>
		</div>
	);
};

export default HandOptions;
