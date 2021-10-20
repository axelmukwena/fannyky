import { login, logout } from "../currentUser/currentUserSlice";

function setStorage(currentUser) {
	try {
		localStorage.setItem("currentUser", JSON.stringify(currentUser));
	} catch (e) {
		console.log(e);
	}
}

// Note: localStorage expects a string
const userMiddleware = (store) => (next) => (action) => {
	if (login.match(action)) {
		setStorage(store.getState().login);
	} else if (logout.match(action)) {
		setStorage(store.getState().logout);
	}
	return next(action);
};

export default userMiddleware;
