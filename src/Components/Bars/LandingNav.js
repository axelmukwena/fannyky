import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
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
	},
}));

const Navbar = () => {
	const classes = useStyles();

	return (
		<AppBar color="secondary" elevation={0} className={clsx(classes.topBar)}>
			<Toolbar className={clsx(classes.toolBar)}>
				<Link href="#" className={clsx(classes.typography)} underline="none">
					Works
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
