import axios from 'axios'
import { apiUrl } from '../../../utils/Helpers'
import { update } from './currentMenuSlice'

function updateMenu(dispatch, contents) {
  dispatch(update(contents))
}

async function paintersMenu(dispatch) {
  // Data
  const url = apiUrl('/')
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  await axios
    .get(url, headers)
    .then(function (response) {
      dispatch(update(response.data))
    })
    .catch(function (error) {
      console.log('Get Painters Error')
      console.log(error)
    })
}

// Compose menu data for a painter's page
function parsePainterMenu(aboutSlug, paintingsSlug, exhibSlug, booksSlug) {
  const data = [
    { id: 1, name: 'About', slug: aboutSlug },
    { id: 2, name: 'Paintings', slug: paintingsSlug },
    { id: 3, name: 'Exhibitions', slug: exhibSlug },
    { id: 4, name: 'Books', slug: booksSlug },
  ]
  return data
}

export { updateMenu, paintersMenu, parsePainterMenu }
