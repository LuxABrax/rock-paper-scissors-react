import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
	const [username, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className='loginContainer'>
			<h1 className='title'>Rock Paper Scissors</h1>
			<form className='loginForm'>
				<label htmlFor='username'>Username: </label>
				<input
					id='username'
					type='text'
					placeholder='Type your username...'
					value={username}
					onChange={e => setName(e.target.value)}
				/>
				<label htmlFor='room'>Room: </label>
				<input
					id='room'
					type='text'
					placeholder='Type your room name...'
					value={room}
					onChange={e => setRoom(e.target.value)}
				/>
				<Link to={`/room/${room}${username}`}>Start</Link>
			</form>
		</div>
	);
};

export default Login;
