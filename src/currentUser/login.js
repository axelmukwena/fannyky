import axios from "axios";
import { authorize } from "./currentUserSlice";
import { setUserCookie } from "../utils/cookies";
import { AUTHORIZE } from "../utils/constants";
import { apiURL } from "../utils/Helpers";

function handleResponse(dispatch, data) {
	if (data.success === true) {
		setUserCookie(AUTHORIZE, data.token, 7);
		dispatch(authorize(data));
		return true;
	} else {
		dispatch(authorize(null));
		return false;
	}
}

async function loginUser(dispatch, params) {
	// Data
	const url = apiURL("/login");
	let headers = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	axios
		.post(url, params, headers)
		.then(function (response) {
			const success = handleResponse(dispatch, response.data);
			return success;
		})
		.catch(function (error) {
			console.log("Login Error");
			console.log(error);
            return false
		});
}

export { loginUser };
