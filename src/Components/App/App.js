import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "./Footer";
import clsx from "clsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Landing from "../Landing/Landing";
import { UserProvider } from "../Globals/UserContext";
import { LoadingProvider } from "../Globals/LoadingContext";

const useStyles = makeStyles((theme) => ({
	container: {},
}));

function App() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.container)}>
			<LoadingProvider>
				<UserProvider>
					<BrowserRouter>
						<Switch>
							<Route path="/home">
								<Home />
							</Route>
							<Route path="/">
								<Landing />
							</Route>
						</Switch>
					</BrowserRouter>
					<Footer />
				</UserProvider>
			</LoadingProvider>
		</div>
	);
}
export default App;
