import { BASE_URL } from "./constants";

// Capitalize first letter
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Compose complete api url
export function apiUrl(sub) {
  return BASE_URL + sub;
}

export function parsePaintingImages(id, images) {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images[]", image);
  });

  formData.append("id", id);
  return formData;
}

// Only submit the necessary params
export function parsePaintingParams(data) {
  const params = {};

  // eslint-disable-next-line no-restricted-syntax
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (key === "painter") {
      if (data[key].id) {
        params[key] = data[key];
      }
    } else if (value === "" || value === undefined || value === null) {
      // Don't append parameter
    } else {
      params[key] = data[key];
    }
  });

  return params;
}
