import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
	const [username, setName] = useState("");
	const [room, setRoom] = useState("");
	const [ready, setReady] = useState(false);

	return (
		<div className='loginContainer'>
			<h1 className='title'>Rock Paper Scissors</h1>
			<form className='loginForm'>
				<label htmlFor='username'>Username</label>
				<input
					className='loginInput'
					id='username'
					type='text'
					value={username}
					onChange={e => setName(e.target.value)}
				/>
				<label htmlFor='room'>Room</label>
				<input
					className='loginInput'
					id='room'
					type='text'
					value={room}
					onChange={e => setRoom(e.target.value)}
				/>
				<Link to={`/room?room=${room}&&username=${username}`}>
					<button className='login-btn'>Start</button>
				</Link>
			</form>
		</div>
	);
};

export default Login;
