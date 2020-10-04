import React, { useState, useEffect } from "react";

import "./Timer.css";

const Timer = ({ isActive, setIsActive, setMode }) => {
	const [seconds, setSeconds] = useState(3);

	function toggle() {
		setIsActive(!isActive);
	}

	function reset() {
		setSeconds(0);
		setIsActive(false);
	}

	useEffect(() => {
		console.log(isActive);
		let interval = null;
		if (isActive) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds - 1);
				if (seconds === 0) {
					clearInterval(interval);
					setSeconds(3);
					setMode("fight");
				}
			}, 1000);
		} else if (!isActive && seconds !== 0) {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive, seconds]);

	return (
		<div className='app'>
			<div className='time'>{seconds}</div>
		</div>
	);
};

export default Timer;
