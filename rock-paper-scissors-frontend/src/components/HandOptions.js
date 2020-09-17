import React from "react";
import "./HandOptions.css";
const HandOptions = () => {
	return (
		<div className='HandOptions'>
			<div className='Hand'>
				<img src='/images/poopPoop.jpg' alt='rock' />
			</div>
			<div className='Hand'>
				<img src='/images/poopPaper.jpg' alt='paper' />
			</div>
			<div className='Hand'>
				<img src='/images/pissScis.jpg' alt='scissors' />
			</div>
		</div>
	);
};

export default HandOptions;
