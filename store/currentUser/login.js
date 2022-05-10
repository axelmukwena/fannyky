import axios from "axios";
import { apiUrl } from "../../utilities/helpers";

async function loginUser(params, handleResponse) {
  // Data
  const url = apiUrl("/auth/login");
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(url, params, headers)
    .then(function foo(response) {
      handleResponse(response.data);
    })
    .catch(function foo(error) {
      console.log("Login Error");
      console.log(error);
    });
}

export default loginUser;
