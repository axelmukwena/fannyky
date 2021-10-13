import React from "react";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import LandingNav from "../Bars/LandingNav";
import Footer from "../Bars/Footer";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	container: {},
}));

function App() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.container)}>
			<LandingNav />
			<Footer />
		</div>
	);
}
export default App;
