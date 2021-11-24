import { BASE_URL } from "./constants";

// Capitalize first letter
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Compose complete api url
export function apiUrl(sub) {
  console.log(BASE_URL);
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

// Get images from pexels
export async function getPhotos(customFuntion, key) {
  await fetch(`https://api.pexels.com/v1/search?query=${key}`, {
    headers: {
      // Authorization: "563492ad6f917000010000014904033d054f48ba9fc7f0d777704c8c",
      Authorization: "563492ad6f917000010000016bb73af9993048a183c64d88cf9aaae4",
    },
  })
    .then((resp) => resp.json())
    .then((data) => customFuntion(data.photos));
}

export const randomPhoto = () => {
  const random = Math.floor(Math.random() * ["photos"].length);
  console.log(["photos"][random]);
  return ["photos"][random];
};

export const parsePexelImage = (url) => {
  let stem = url.split("crop&h")[0];
  stem += "crop&h=200&w=200";
  return stem;
};
