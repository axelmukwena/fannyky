import axios from "axios";
import { AUTHORIZE } from "./constants";
import { getUserCookie } from "./cookies";
import { apiUrl } from "./helpers";

function handleMissingRecords(message) {
  console.log(message);
}

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
      if (response.data.record === false) {
        handleMissingRecords(response.data);
        return null;
      }
      handleResponse(response.data);
      return response.data;
    })
    .catch(function foo(error) {
      console.log("Public Data Error");
      console.log(error);
    });
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

    axios
      .post(url, params, headers)
      .then(function foo(response) {
        if (response.data.record === false) {
          handleMissingRecords(response.data);
        } else {
          handleResponse(response.data);
        }
      })
      .catch(function foo(error) {
        console.log("POST Resource Error");
        console.log(error);
      });
  }
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
        if (response.data.record === false) {
          handleMissingRecords(response.data);
        } else {
          handleResponse(response.data);
        }
      })
      .catch(function foo(error) {
        console.log("POST Resource Error");
        console.log(error);
      });
  }
}

export async function deleteResource(path, handleResponse) {
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
      .delete(url, headers)
      .then(function foo(response) {
        if (response.data.record === false) {
          handleMissingRecords(response.data);
        } else {
          handleResponse(response.data);
        }
      })
      .catch(function foo(error) {
        console.log("Delete Resource Error");
        console.log(error);
      });
  }
}
