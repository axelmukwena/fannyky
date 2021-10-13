import React, { useState } from "react";
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(4),
		//width: "100%",

		//"& .MuiTextField-root": {
		//	margin: theme.spacing(1),
		//	width: "300px",
		//},
	},
	textField: {
		margin: theme.spacing(1),
		// width: "100%",
	},
	button: {
		margin: theme.spacing(2),
	},
	typography: {
		marginBottom: theme.spacing(2),
		fontWeight: 800,
		fontSize: "1.2rem",
		color: "#222",
		flexGrow: 1,
		textAlign: "center",
	},
	[theme.breakpoints.down("lg")]: {
		textFieldStyle: {
			backgroundColor: "yellow",
			fontSize: 19,
		},
	},
	[theme.breakpoints.down("md")]: {
		textFieldStyle: {
			backgroundColor: "green",
			fontSize: 17,
		},
	},
	[theme.breakpoints.down("sm")]: {
		textFieldStyle: {
			backgroundColor: "blue",
			fontSize: 15,
		},
	},
}));

const Form = ({ handleClose }) => {
	const classes = useStyles();
	// create state variables for each input
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		handleClose();
	};

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Typography variant="h3" className={classes.typography}>
					Admin Login Panel
				</Typography>

				<Grid container spacing={2}>
					<Grid item lg={12} xs={12} md={12}>
						<TextField
							fullWidth
							autoFocus
							label="Email"
							variant="outlined"
							type="email"
							name="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>
					<Grid item lg={12} xs={12} md={12}>
						<TextField
							fullWidth
							label="Password"
							variant="outlined"
							type="password"
							name="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Grid>
				</Grid>

				<div>
					<Button
						className={classes.button}
						variant="contained"
						onClick={handleClose}
					>
						Cancel
					</Button>
					<Button
						className={classes.button}
						type="submit"
						variant="contained"
						color="primary"
					>
						Signup
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Form;
