import React, { useState } from "react";
import Select from "react-dropdown-select";
import "./Sidebar.css";
const Sidebar = ({ joinRoom, theme, setTheme }) => {
	const [username, setName] = useState("");
	const [room, setRoom] = useState("");
	const options = [
		{ value: "classic", label: "Classic" },
		{ value: "poop", label: "Poop" },
		{ value: "batman", label: "Batman" },
	];
	return (
		<div className='sidebar'>
			<form className='join-form'>
				<label htmlFor='username'>Username</label>
				<input
					className='join-input'
					id='username'
					type='text'
					value={username}
					onChange={e => setName(e.target.value)}
				/>
				<label htmlFor='room'>Room</label>
				<input
					className='join-input'
					id='room'
					type='text'
					value={room}
					onChange={e => setRoom(e.target.value)}
				/>
				<button
					className='join-btn'
					type='submit'
					onClick={e => joinRoom(username, room, e)}
				>
					Join
				</button>
				<div className='dev-magic'>
					<button
						className='join-btn'
						type='submit'
						onClick={e => joinRoom("Robin", "room", e)}
					>
						Robin
					</button>
					<button
						className='join-btn'
						type='submit'
						onClick={e => joinRoom("Batman", "room", e)}
					>
						Batman
					</button>
				</div>
				<div className='theme-chooser'>
					<span>Theme: </span>
					<Select
						options={options}
						value={options.find(opt => opt.value === theme)}
						onChange={value => setTheme(value)}
					/>
				</div>
			</form>
		</div>
	);
};

export default Sidebar;
