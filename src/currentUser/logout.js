import axios from "axios";
import Cookies from "js-cookie";
import { AUTHORIZE } from "../utils/constants";
import { getUserCookie } from "../utils/cookies";
import { apiURL } from "../utils/Helpers";
import { authorize } from "./currentUserSlice";

function handleResponse(dispatch, data) {
	if (data.success === true) {
		Cookies.remove(AUTHORIZE);
		dispatch(authorize(null));
		return true;
	} else {
		console.log(data.message)
		return false;
	}
}

async function logoutUser(dispatch) {
	const token = getUserCookie(AUTHORIZE);

	// Only send request if there's a authorize cookie set
	if (token) {
		// Data
		const url = apiURL("/logout");
		let headers = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		axios
			.delete(url, headers)
			.then(function (response) {
				return handleResponse(dispatch, response.data);
			})
			.catch(function (error) {
				console.log("Logout Error");
				console.log(error);
                return false
			});
	}
}

export { logoutUser };
