import { Card, Link, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getPublicData } from '../../utils/Helpers'
import { parsePainterMenu, updateMenu } from '../Menu/menuSlice/updateMenu'

const Painter = ({ match }) => {
  const [paintings, setPaintings] = useState([])
  const dispatch = useDispatch()

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

  const paintingsUrl = `${match.url}/paintings`
  useEffect(() => {
    getPublicData(setPainter, match.url)
    getPublicData(setPaintings, paintingsUrl)
  }, [paintingsUrl])

  return (
    <div>
      {paintings.map((painting) => (
        <Card key={painting.id} style={{ width: '33%', margin: 20 }}>
          <Typography
            style={{
              fontWeight: 300,
            }}
          >
            {painting.painter.name}
          </Typography>
          <Link href={`${match.url}/paintings/${painting.slug}`}>
            <Typography
              style={{
                fontWeight: 300,
              }}
            >
              {painting.title}
            </Typography>
          </Link>
          <Typography
            style={{
              fontWeight: 300,
            }}
          >
            {painting.description}
          </Typography>
        </Card>
      ))}
    </div>
  )
}

export default Painter
