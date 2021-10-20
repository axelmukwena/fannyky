import React, { useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Components/Home/Home";
import Landing from "../Components/Landing/Landing";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { authorizeUser } from "../currentUser/authorize";

const useStyles = makeStyles((theme) => ({
	container: {},
}));

function App() {
	const classes = useStyles();

	const dispatch = useDispatch();

	useEffect(() => {
		authorizeUser(dispatch);
	});

	return (
		<BrowserRouter className={clsx(classes.container)}>
			<Switch>
				<Route path="/home">
					<Home />
				</Route>
				<Route path="/">
					<Landing />
				</Route>
			</Switch>
			<Footer />
		</BrowserRouter>
	);
}
export default App;
