import React, { useState } from "react";
import "./Sidebar.css";
const Sidebar = ({ joinRoom }) => {
	const [username, setName] = useState("");
	const [room, setRoom] = useState("");

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
			</form>
		</div>
	);
};

export default Sidebar;
