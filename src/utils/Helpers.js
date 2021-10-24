import axios from 'axios'
import { BASE_URL } from './constants'

export function apiURL(sub) {
  return BASE_URL + sub
}

export async function getPublicData(customFuntion, link) {
  // Data
  const url = apiURL(link)
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
      console.log('Get Painters Error')
      console.log(error)
    })
}

// export async function getPrivateData(customFuntion, link) {}
