import { BASE_URL } from "./constants";

// Capitalize first letter
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Compose complete api url
export function apiUrl(sub) {
  return BASE_URL + sub;
}

export function parseImages(id, images) {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images[]", image);
  });

  formData.append("id", id);
  return formData;
}

// Only submit the necessary params
export function parseGeneralParams(data) {
  const params = {};

  // eslint-disable-next-line no-restricted-syntax
  Object.keys(data).forEach((key) => {
    const value = data[key];
    // If painter present, verify content, not only object
    if (key === "painter") {
      if (data[key].id) {
        params[key] = data[key];
      }
    } else if (!value) {
      params[key] = "";
    } else {
      params[key] = data[key];
    }
  });

  return params;
}

// Split asPath from next router
export function parsePath(path) {
  let parsed = path.replaceAll("/", " ").trim();
  parsed = parsed.split(" ");
  if (parsed[0] && parsed[0] !== "[painterSlug]") {
    return parsed;
  }
  return null;
}

// Compose menu data for a painter's page
export function parsePainterMenu(painter) {
  const menu = [];

  if (!painter) return [];

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
              painterSlug: `/${painter.slug}`,
              extension: "",
            };
          } else {
            menuObject = {
              id: splitKey[0],
              name: capitalize(splitKey[0]),
              painterSlug: `/${painter.slug}`,
              extension: `/${splitKey[0]}`,
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
    painterSlug: `/${painter.slug}`,
    extension: "/biography",
  });

  menu.push({
    id: "contact",
    name: "Contact",
    painterSlug: `/${painter.slug}`,
    extension: "/contact",
  });
  return menu;
}
