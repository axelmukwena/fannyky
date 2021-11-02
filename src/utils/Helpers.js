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
