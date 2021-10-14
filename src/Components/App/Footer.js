import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ModalDialog from "./../Login/ModalDialog";

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

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<AppBar color="secondary" elevation={0} className={clsx(classes.topBar)}>
			<Toolbar className={classes.toolBar}>
				<Typography className={classes.typography}>
					© {currentYear}. All rights reserved.{" "}
					<Button className={classes.button} onClick={handleOpen}>
						<p
							style={{ textDecoration: "underline" }}
							className={classes.typography}
						>
							Admin
						</p>
					</Button>
				</Typography>
			</Toolbar>
			<ModalDialog open={open} handleClose={handleClose} />
		</AppBar>
	);
};

export default Footer;
