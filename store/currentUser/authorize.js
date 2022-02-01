import axios from "axios";
import { AUTHORIZE } from "../../utilities/constants";
import { getUserCookie, setUserCookie } from "../../utilities/cookies";
import { apiUrl } from "../../utilities/helpers";
import { authorize } from "./currentUserSlice";

function handleResponse(dispatch, data) {
  if (data.success === true) {
    setUserCookie(AUTHORIZE, data.token, 7);
    dispatch(authorize(data));
    return true;
  }
  dispatch(authorize(null));
  return false;
}

async function authorizeUser(dispatch) {
  const token = getUserCookie(AUTHORIZE);

  // Only send request if there's a authorize cookie set
  if (token) {
    // Data
    const url = apiUrl("/authorize");
    const headers = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };

    axios
      .get(url, headers)
      .then(function foo(response) {
        return handleResponse(dispatch, response.data);
      })
      .catch(function foo(error) {
        console.log("Authorize Error");
        console.log(error);
        return false;
      });
  }
}

export default authorizeUser;