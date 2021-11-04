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
import './Paintings.css'

const Paintings = () => {
  const { path } = useRouteMatch()
  const [paintings, setPaintings] = useState([])
  const [photos, setPhotos] = useState([])
  // const [mobile, setMobile] = useState(true)

  useEffect(() => {
    getPhotos('painting', setPhotos)
    getPublicData(setPaintings, `/${path}/paintings`)
    // Initialize
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const handleOpen = () => {}

  const RandomPhoto = () => {
    if (photos.length > 0) {
      const random = Math.floor(Math.random() * photos.length)
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

  // On screen width changes
  const handleResize = () => {
    if (window.innerWidth < 720) {
      createColumns(1)
    } else {
      createColumns(3)
    }
  }

  // Create columns dynamically
  function createColumns(numberOfColumns) {
    const columns = []
    for (let i = 0; i < numberOfColumns; i += 1) {
      const column = <div className="paintings_column"></div>
      columns.append(column)
    }
  }

  const PaintingCards = () => {
    const paintingsContainer = document.querySelector('.paintings')
    if (paintings.length > 0 && photos.length > 0) {
      const columns = document.getElementsByClassName('paintings_column')
      let times = Math.round(paintings.length / columns.length)
      console.log(times, paintings.length / columns.length)
      const check = times * columns.length
      console.log('Check', check)
      if (check < paintings.length) {
        console.log('Is', paintings.length)
        times += 1
      }
      console.log('Times', times)
      let p = 0
      for (let i = 0; i < times; i += 1) {
        for (let j = 0; j < columns.length; j += 1) {
          columns[j].innerHTML += (
            <CardMedia
              component="img"
              src={photos[p].src.large2x}
              alt="green iguana"
            />
          )
          p += 1
        }
      }
      // const cards = ReactDOM.render(columns)
      // return
    }
    return null
  }

  return (
    <div style={{ margin: 15 }}>
      <Grid container spacing={2} style={{ marginBottom: 10 }}>
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
        <div className="paintings">
          <PaintingCards />
        </div>
        <div style={{ width: '100%', borderBottom: '1px solid black' }} />
        {paintings.map((painting) => (
          <Grid key={painting.id} item lg={4} md={6} xs={12}>
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
