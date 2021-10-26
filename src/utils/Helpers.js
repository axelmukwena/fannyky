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
      console.log('Get Painters Error')
      console.log(error)
    })
}

// Get private data from api
// export async function getPrivateData(customFuntion, link) {}

// Compose menu data for a painter's page
export function menuData(
  painterName,
  painterSlug,
  paintingsSlug,
  exhibSlug,
  contactSlug,
) {
  const data = {
    1: {
      id: 1,
      name: `About ${painterName}`,
      slug: painterSlug,
    },
    2: {
      id: 2,
      name: 'Paintings',
      slug: paintingsSlug,
    },
    3: { id: 3, name: 'Exhibitions', slug: exhibSlug },
    4: { id: 4, name: 'Contact', slug: contactSlug },
    5: { id: 5, name: 'Exhibitions', slug: exhibSlug },
  }
  return data
}
