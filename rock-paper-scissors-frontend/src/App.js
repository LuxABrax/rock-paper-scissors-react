import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";

import "./App.css";

import RoomPage from "./pages/RoomPage";

function App() {
	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/room' exact component={RoomPage} />
					<Redirect to='/room' />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
