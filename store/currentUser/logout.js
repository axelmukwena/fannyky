import Cookies from "js-cookie";
import { AUTHORIZE } from "../../utilities/constants";
import { getUserCookie } from "../../utilities/cookies";

async function logoutUser() {
  const token = getUserCookie(AUTHORIZE);

  if (token) {
    Cookies.remove(AUTHORIZE);
  }
}

/* function handleResponse(dispatch, data) {
  if (data.success === true) {
    Cookies.remove(AUTHORIZE);
    dispatch(authorize(null));
    return true;
  }
  return false;
}

async function logoutUser(dispatch) {
  const token = getUserCookie(AUTHORIZE);

  // Only send request if there's a authorize cookie set
  if (token) {
    // Data
    const url = apiUrl("/logout");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    axios
      .delete(url, headers)
      .then(function foo(response) {
        handleResponse(dispatch, response.data);
        return true;
      })
      .catch(function foo(error) {
        console.log("Logout Error");
        console.log(error);
        return false;
      });
  }
} */

export default logoutUser;
