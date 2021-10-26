import { Link, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { getPublicData } from '../../utils/Helpers'

const Painter = ({ match }) => {
  const [paintings, setPaintings] = useState([])

  const paintingsUrl = `${match.url}/paintings`
  useEffect(() => {
    getPublicData(setPaintings, paintingsUrl)
  }, [paintingsUrl])

  return (
    <div>
      {paintings.map((painting) => (
        <div key={painting.id}>
          <Typography>{painting.painter.name}</Typography>
          <Link href={`${match.url}/paintings/${painting.slug}`}>
            <Typography>{painting.title}</Typography>
          </Link>
          <Typography>{painting.description}</Typography>
        </div>
      ))}
    </div>
  )
}

export default Painter
