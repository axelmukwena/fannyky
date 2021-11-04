import axios from 'axios'
import { BASE_URL } from './constants'

// Compose complete api url
export function apiUrl(sub) {
  return BASE_URL + sub
}

// Get public data from api
export async function getPublicData(customFuntion, link) {
  // Data
  const url = apiUrl(link)
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  await axios
    .get(url, headers)
    .then(function (response) {
      customFuntion(response.data)
    })
    .catch(function (error) {
      console.log('Public Data Error')
      console.log(error)
    })
}

// Get private data from api
// export async function getPrivateData(customFuntion, link) {}

// Get images from pexels
export async function getPhotos(key, customFuntion) {
  await fetch(`https://api.pexels.com/v1/search?query=${key}`, {
    headers: {
      Authorization: '563492ad6f917000010000014904033d054f48ba9fc7f0d777704c8c',
    },
  })
    .then((resp) => resp.json())
    .then((data) => customFuntion(data.photos))
}

export const randomPhoto = () => {
  const random = Math.floor(Math.random() * ['photos'].length)
  console.log(['photos'][random])
  return ['photos'][random]
}
