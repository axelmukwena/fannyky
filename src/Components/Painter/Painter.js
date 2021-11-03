import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { getPublicData } from '../../utils/Helpers'
import { parsePainterMenu, updateMenu } from '../Menu/menuSlice/updateMenu'
import Books from './Books'
import Exhibitions from './Exhibitions'
import Paintings from './Paintings'

const Painter = ({ match }) => {
  const dispatch = useDispatch()

  // paths
  // paintings => /painter
  // exhibitions => /painter/exhibitions
  // books => /painter/books
  // about => /painter/about

  // If painter updated, set painter menu
  // parsePainterMenu(painterName, aboutSlug, paintingsSlug, exhibSlug, booksSlug)
  function setPainter(painter) {
    if (painter) {
      const data = parsePainterMenu(
        `${match.url}/about`,
        `${match.url}`,
        `${match.url}/exhibitions`,
        `${match.url}/books`,
      )
      updateMenu(dispatch, data)
    }
  }

  useEffect(() => {
    getPublicData(setPainter, match.url)
  }, [])

  return (
    <div style={{ margin: 15 }}>
      <Switch>
        <Route
          path={`${match.url}/exhibitions`}
          component={Exhibitions}
          key={document.location.href}
        />
        <Route
          path={`${match.url}/books`}
          component={Books}
          key={document.location.href}
        />
        <Route
          path={match.url}
          component={Paintings}
          key={document.location.href}
        />
      </Switch>
    </div>
  )
}

export default Painter
