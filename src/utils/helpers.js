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
