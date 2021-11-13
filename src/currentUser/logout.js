import axios from "axios";
import Cookies from "js-cookie";
import { AUTHORIZE } from "../utils/constants";
import { getUserCookie } from "../utils/cookies";
import { apiUrl } from "../utils/Helpers";
import { authorize } from "./currentUserSlice";

function handleResponse(dispatch, data) {
  if (data.success === true) {
    Cookies.remove(AUTHORIZE);
    dispatch(authorize(null));
    return true;
  }
  console.log(data.message);
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
        return handleResponse(dispatch, response.data);
      })
      .catch(function foo(error) {
        console.log("Logout Error");
        console.log(error);
        return false;
      });
  }
}

export default logoutUser;
