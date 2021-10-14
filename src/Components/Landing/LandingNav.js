import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	topBar: {
		margin: 0,
		position: "static",
	},
	toolBar: {
		marginLeft: theme.spacing(3),
		marginTop: theme.spacing(2),
	},
	typography: {
		fontWeight: 500,
		fontSize: "1.2rem",
		color: "#444",
		textDecoration: "none",
	},
}));

const LandingNav = () => {
	const classes = useStyles();

	return (
		<AppBar color="secondary" elevation={0} className={clsx(classes.topBar)}>
			<Toolbar className={clsx(classes.toolBar)}>
				<Link to="/home" className={clsx(classes.typography)}>
					Works
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default LandingNav;
