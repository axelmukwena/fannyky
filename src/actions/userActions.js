import Cookies from "js-cookie";
import axios from "axios";


function handleResponse(dispatch, data) {
	if (data.success === true) {
		Cookies.remove("userSession");
		Cookies.set("userSession", data.token, { expires: 14 });
		dispatch({ type: "LOGIN_USER", user: data.user });
	} else {
		dispatch({ type: "INVALID_USER", errors: data.message });
	}
	dispatch({ type: "COMPLETE_AUTH" });
}

function zloginUser(params) {
	// Data
	const url = "http://localhost:3000/api/login";
	let headers = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	return function (dispatch) {
		dispatch({ type: "START_AUTH" });
		axios
			.post(url, params, headers)
			.then(function (response) {
				console.log(params);
				console.log(response);
				handleResponse(dispatch, response.data);
			})
			.catch(function (error) {
				console.log("Error");
				console.log(error);
			});
	};
}

function zlogoutUser() {
	Cookies.remove("userSession");
	return (dispatch) => {
		dispatch({ type: "INVALID_USER", errors: "user logged out" });
	};
}

function zauthorizeUser() {
	let token = Cookies.get("userSession");
	const url = "http://localhost:3000/api/login";
	return (dispatch) => {
		dispatch({ type: "START_AUTH" });
		if (token) {
			const configObj = {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: token,
				},
				credentials: "include",
			};
			fetch(url, configObj)
				.then((resp) => resp.json())
				.then((authResp) => {
					if (authResp.valid === "true") {
						dispatch({ type: "LOGIN_USER", user: authResp.user });
					} else {
						dispatch({
							type: "INVALID_USER",
							errors: { session: "Please login to continue" },
						});
					}
					dispatch({ type: "COMPLETE_AUTH" });
				});
		} else {
			dispatch({
				type: "INVALID_USER",
				errors: { session: "Please login to continue" },
			});
			dispatch({ type: "COMPLETE_AUTH" });
		}
	};
}

export { zloginUser, zauthorizeUser, zlogoutUser };
