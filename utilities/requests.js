import axios from "axios";
import { AUTHORIZE } from "./constants";
import { getUserCookie } from "./cookies";
import { apiUrl } from "./helpers";

function handleMissingRecords(message) {
  console.log(message);
}

// Get data from api using timeout
export async function fetchWithTimeout(url) {
  const controller = new AbortController();
  const timeout = 5000;

  const id = setTimeout(() => {
    controller.abort();
  }, timeout);

  // Data
  const headers = {
    signal: controller.signal,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .get(url, headers)
    .then(function foo(res) {
      return res.data;
    })
    .catch(function foo(error) {
      console.log("Public Data Error");
      console.log(error);
      if (error.message === "canceled") {
        return "timeout";
      }
      return { record: false, error: "Public Data Error" };
    });

  clearTimeout(id);
  console.log("Fetch Response:", response);
  return response;
}

// Get data from api
export async function getResource(path, handleResponse) {
  // Data
  const url = apiUrl(path);

  let response = await fetchWithTimeout(url);
  console.log("response:", response);

  while (response === "timeout") {
    handleResponse(null);
    // eslint-disable-next-line no-await-in-loop
    response = await fetchWithTimeout(url);
    console.log("response:", response);
    if (response !== "timeout") {
      break;
    }
  }

  handleResponse(response);
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
        if (response.data && response.data.record === false) {
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
        if (response.data && response.data.record === false) {
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
        if (response.data && response.data.record === false) {
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
