import axios from "axios";
import { AUTHORIZE } from "../utils/constants";
import { getUserCookie, setUserCookie } from "../utils/cookies";
import { apiURL } from "../utils/Helpers";
import { authorize } from "./currentUserSlice";

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

async function authorizeUser(dispatch) {
	const token = getUserCookie(AUTHORIZE);

	// Only send request if there's a authorize cookie set
	if (token) {
		// Data
		const url = apiURL("/authorize");
		let headers = {
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		};

		axios
			.get(url, headers)
			.then(function (response) {
				return handleResponse(dispatch, response.data);
			})
			.catch(function (error) {
				console.log("Authorize Error");
				console.log(error);
                return false
			});
	}
}

export { authorizeUser };
