import axios from "axios";
import useSWR from "swr";
import { AUTHORIZE } from "../utilities/constants";
import { getUserCookie, setUserCookie } from "../utilities/cookies";
import { apiUrl } from "../utilities/helpers";

// Require TOKEN, hence this is protected
async function userFetcher(path) {
  const token = getUserCookie(AUTHORIZE);

  // Only send request if there's a authorize cookie set
  if (!token)
    return {
      success: false,
      error: true,
      message: "No token found! Please login again.",
    };

  const url = apiUrl(path);

  // headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: token,
  };

  const config = { headers };

  const response = await axios
    .get(url, config)
    .then(function foo(res) {
      if (res.data.record === false) {
        setUserCookie(AUTHORIZE, res.data.token, 7);
      }
      return res.data;
    })
    .catch(function foo(error) {
      console.log("GET Resource Error");
      console.log(error);
      return { record: false, error, message: error.message };
    });

  return response;
}

function usePainter() {
  const { data, error } = useSWR("/", userFetcher, {
    refreshInterval: 10000,
  });

  return {
    user: data?.user,
    isLoading: !data && !error,
    isError: error,
  };
}

export default usePainter;
