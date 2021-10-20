import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography, Toolbar, AppBar, Button } from "@material-ui/core";
import ModalDialog from "../Components/Login/ModalDialog";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../currentUser/logout";
import { useHistory } from "react-router";

const useStyless = makeStyles((theme) => ({
	topBar: {
		bottom: 0,
		top: "auto",
		position: "fixed",
	},
	typography: {
		fontWeight: 400,
		fontSize: "0.8rem",
		color: "#444",
		flexGrow: 1,
		textAlign: "center",
	},
	toolBar: {
		minHeight: 50,
	},
	button: {
		textTransform: "none",
		padding: 0,
		marginBottom: 4,
		minWidth: 50,
	},
}));

const Footer = () => {
	const classes = useStyless();
	const currentYear = new Date().getFullYear();
	const [open, setOpen] = useState(false);
	const dispatch = useDispatch();
    const history = useHistory()

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleLogOut = () => {
		const success = logoutUser(dispatch);
        // https://reactrouter.com/web/api/Hooks/usehistory
		if (success) {
            history.push('/')
		}
	};

	const currentUser = useSelector((state) => state.currentUser.user);

	const LoggedOut = () => {
		return (
			<Button className={classes.button} onClick={handleOpen}>
				<p
					style={{ textDecoration: "underline" }}
					className={classes.typography}
				>
					Admin
				</p>
			</Button>
		);
	};

	const LoggedIn = () => {
		return (
			<span>
				<Button className={classes.button} onClick={handleLogOut}>
					<p
						style={{ textDecoration: "underline" }}
						className={classes.typography}
					>
						Logout
					</p>
				</Button>
				<span> {currentUser.user.email.split("@")[0]}</span>
			</span>
		);
	};

	const IsLoggedIn = () => {
		if (currentUser) {
			return <LoggedIn />;
		}
		return <LoggedOut />;
	};

	return (
		<AppBar color="secondary" elevation={0} className={clsx(classes.topBar)}>
			<Toolbar className={classes.toolBar}>
				<Typography className={classes.typography}>
					© {currentYear}. All rights reserved. <IsLoggedIn />
				</Typography>
			</Toolbar>
			<ModalDialog open={open} handleClose={handleClose} />
		</AppBar>
	);
};

export default Footer;
