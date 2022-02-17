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
  let menu = [];

  if (!painter) return [];

  menu = painter.menuitems.map((item) => {
    if (item === "Works") {
      return {
        id: item.toLowerCase(),
        name: "Works",
        painterSlug: `/${painter.slug}`,
        extension: "",
      };
    }
    return {
      id: item.toLowerCase(),
      name: capitalize(item),
      painterSlug: `/${painter.slug}`,
      extension: `/${item.toLowerCase()}`,
    };
  });

  return menu;
}
