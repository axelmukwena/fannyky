import axios from 'axios'
import { apiUrl } from '../../../utils/Helpers'
import { update } from './currentMenuSlice'

function updateMenu(dispatch, contents) {
  dispatch(update(contents))
}

async function defaultMenu(dispatch) {
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

export { updateMenu, defaultMenu }
