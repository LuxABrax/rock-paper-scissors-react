import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import RoomPage from "./pages/RoomPage";

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/' exact component={Login} />
					<Route path='/room/:rid' exact component={RoomPage} />
					<Redirect to='/' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
