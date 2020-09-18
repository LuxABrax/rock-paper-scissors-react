import React, { useState } from "react";
import "./HandOptions.css";
const HandOptions = ({ player }) => {
	const [active, setActive] = useState(0);

	return (
		<div className={`HandOptions player${player}`}>
			<div
				className={`Hand pos1 ${active === 1 ? "active" : ""}`}
				onClick={() => setActive(1)}
			>
				<img src='/images/poopPoop.jpg' alt='rock' />
			</div>
			<div
				className={`Hand pos1 ${active === 2 ? "active" : ""}`}
				onClick={() => setActive(2)}
			>
				<img src='/images/poopPaper.jpg' alt='paper' />
			</div>
			<div
				className={`Hand pos1 ${active === 3 ? "active" : ""}`}
				onClick={() => setActive(3)}
			>
				<img src='/images/pissScis.jpg' alt='scissors' />
			</div>
		</div>
	);
};

export default HandOptions;
