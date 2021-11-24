import axios from "axios";
import { AUTHORIZE } from "./constants";
import { getUserCookie } from "./cookies";
import { apiUrl } from "./helpers";

// Get data from api
export async function getResource(path, handleResponse) {
  // Data
  const url = apiUrl(path);
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get(url, headers)
    .then(function foo(response) {
      handleResponse(response.data);
    })
    .catch(function foo(error) {
      console.log("Public Data Error");
      console.log(error);
    });
}

export async function putResource(path, params, handleResponse) {
  const token = getUserCookie(AUTHORIZE);

  // Only send request if there's a authorize cookie set
  if (token) {
    const url = apiUrl(path);

    // headers
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .put(url, params, headers)
      .then(function foo(response) {
        return handleResponse(response.data);
      })
      .catch(function foo(error) {
        console.log("POST Resource Error");
        console.log(error);
        return false;
      });
  }
}

// Post data to api
export async function postResource(path, params, handleResponse) {
  const token = getUserCookie(AUTHORIZE);

  // Only send request if there's a authorize cookie set
  if (token) {
    const url = apiUrl(path);

    // headers
    const headers = {
      headers: {
        Authorization: token,
      },
    };

    /* fetch(url, {
      method: "POST",
      headers,
      body: params,
    })
      .then(function foo(response) {
        return handleResponse(response.data);
      })
      .catch(function foo(error) {
        console.log("POST Resource Error");
        console.log(error);
        return false;
      }); */

    axios
      .post(url, params, headers)
      .then(function foo(response) {
        return handleResponse(response.data);
      })
      .catch(function foo(error) {
        console.log("POST Resource Error");
        console.log(error);
        return false;
      });
  }
}
