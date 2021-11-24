import axios from "axios";
import { apiUrl, capitalize } from "../../../utils/helpers";
import { updateMenu } from "./currentMenuSlice";

function updateMenuSlice(dispatch, contents) {
  dispatch(updateMenu(contents));
}

async function paintersMenu(dispatch) {
  // Data
  const url = apiUrl("/");
  const headers = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios
    .get(url, headers)
    .then(function foo(response) {
      dispatch(updateMenu(response.data));
    })
    .catch(function foo(error) {
      console.log("Get Painters Error");
      console.log(error);
    });
}

// Compose menu data for a painter's page
function parsePainterMenu(painter, url) {
  const menu = [];

  Object.entries(painter).forEach((item) => {
    const [key, value] = item;
    const splitKey = key.split("_");
    if (splitKey.length === 2 && splitKey[1] === "count") {
      if (splitKey[0] !== "images") {
        if (value > 0) {
          let menuObject = {};
          if (splitKey[0] === "paintings") {
            menuObject = {
              id: splitKey[0],
              name: "Works",
              slug: `${url}`,
            };
          } else {
            menuObject = {
              id: splitKey[0],
              name: capitalize(splitKey[0]),
              slug: `${url}/${splitKey[0]}`,
            };
          }
          menu.push(menuObject);
        }
      }
    }
  });

  menu.push({
    id: "biography",
    name: "Biography",
    slug: `${url}/biography`,
  });

  menu.push({
    id: "contact",
    name: "Contact",
    slug: `${url}/contact`,
  });
  return menu;
}

export { updateMenuSlice, paintersMenu, parsePainterMenu };
