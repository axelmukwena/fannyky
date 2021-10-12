import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	topBar: {
		margin: 0,
		padding: 20,
		position: "static",
	},
	title: {
		marginLeft: theme.spacing(2),
		marginTop: theme.spacing(2),
	},
	typography: {
		fontWeight: 500,
		fontSize: "1.2rem",
		color: "#444",
	},
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<AppBar elevation={0} classes={clsx(classes.topBar)}>
			<Toolbar>
				<Link
					href="#"
					className={clsx(classes.typography, classes.title)}
					underline="none"
				>
					Works
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
