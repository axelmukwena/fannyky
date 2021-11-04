import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getPhotos, getPublicData } from '../../utils/Helpers'

const Paintings = () => {
  const { path } = useRouteMatch()
  const [paintings, setPaintings] = useState([])
  const [photos, setPhotos] = useState([])

  const url = `/${path}/paintings`
  useEffect(() => {
    getPublicData(setPaintings, url)
    getPhotos('painting', setPhotos)
  }, [url])

  const handleOpen = () => {}

  const RandomPhoto = () => {
    if (photos.length > 0) {
      const random = Math.floor(Math.random() * photos.length)
      console.log(photos[random])
      return (
        <CardMedia
          component="img"
          src={photos[random].src.large2x}
          alt="green iguana"
        />
      )
    }
    return 'Loading...'
  }

  return (
    <div style={{ margin: 15 }}>
      <Grid container spacing={4} style={{ marginBottom: 10 }}>
        <Grid item lg={3} md={6} xs={6}>
          <Button
            style={{ width: '100%', height: 40 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            New Painting
          </Button>
        </Grid>
        <Grid item lg={3} md={6} xs={6}>
          <Button
            style={{ width: '100%', height: 40 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            New Category
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {paintings.map((painting) => (
          <Grid key={painting.id} item lg={4} md={4} xs={12}>
            <Card
              style={{
                width: '100%',
                borderRadius: 8,
                boxShadow: 'rgb(140 152 164 / 18%) 0px 0px 14px 0px',
              }}
            >
              <RandomPhoto />
              <CardContent style={{ padding: 10 }}>
                <Typography
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {painting.painter.name}
                </Typography>
                <Link href={`${path}/paintings/${painting.slug}`}>
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Paintings
