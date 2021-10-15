import React, { useContext, useState } from "react";
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	Grid,
	Link,
	InputAdornment,
	FormControl,
	InputLabel,
	OutlinedInput,
	IconButton,
} from "@material-ui/core";
import axios from "axios";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import {
	LoadingContext,
	LoadingDispatchContext,
} from "../Globals/LoadingContext";

const useStyles = makeStyles((theme) => ({
	form: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(4),
		maxWidth: 400,
	},
	textField: {
		margin: theme.spacing(1),
	},
	button: {
		width: "100%",
		height: 40,
	},
	title: {
		marginBottom: theme.spacing(2),
		fontWeight: 800,
		fontSize: "1.2rem",
		color: "#222",
		flexGrow: 1,
		textAlign: "center",
	},
	forgotPassword: {
		marginTop: theme.spacing(2),
		fontWeight: 400,
		fontSize: "1rem",
		color: "#222",
		flexGrow: 1,
		textAlign: "center",
	},
}));

const Form = ({ handleClose }) => {
	const classes = useStyles();

	const loading = useContext(LoadingContext);
	const setLoading = useContext(LoadingDispatchContext);

	// create state variables for each input
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState({
		password: "",
		showPassword: false,
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Data
		const url = "http://localhost:3000/api/login";
		let user = {
			email: email,
			password: password,
		};
		let headers = {};

		setLoading(true);
		axios
			.post(url, user)
			.then(function (response) {
				console.log(response);
				setLoading(false);
				handleClose();
			})
			.catch(function (error) {
				console.log("Error");
				console.log(error);
			});
	};

	const handleChange = (prop) => (event) => {
		setPassword({ ...password, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setPassword({
			...password,
			showPassword: !password.showPassword,
		});
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Typography variant="h3" className={classes.title}>
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
						<FormControl required fullWidth variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								Password
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								type={password.showPassword ? "text" : "password"}
								name="password"
								value={password.password}
								onChange={handleChange("password")}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{password.showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
					</Grid>

					<Grid item lg={6} xs={6} md={6}>
						<Button
							className={classes.button}
							variant="outlined"
							onClick={handleClose}
						>
							Cancel
						</Button>
					</Grid>
					<Grid item lg={6} xs={6} md={6}>
						<Button
							className={classes.button}
							type="submit"
							variant="contained"
							color="primary"
						>
							Signup
						</Button>
					</Grid>
				</Grid>

				<Link href="#" className={classes.forgotPassword}>
					Forgot password?
				</Link>
			</form>
		</div>
	);
};

export default Form;
