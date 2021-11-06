import { Button, Card, CardMedia, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getPhotos, getPublicData } from '../../utils/Helpers'

const Paintings = () => {
  const { path } = useRouteMatch()
  const [paintings, setPaintings] = useState([])
  const [photos, setPhotos] = useState([])
  const [columnQty, setColumnQty] = useState(1)

  useEffect(() => {
    getPhotos(setPhotos, 'painting')
    getPublicData(setPaintings, `/${path}/paintings`)
    // Initialize size
    handleResize()
    window.addEventListener('resize', handleResize)
  }, [])

  const handleOpen = () => {}

  // On screen width changes
  const handleResize = () => {
    if (window.innerWidth < 540) {
      setColumnQty(1)
    } else if (window.innerWidth <= 1024) {
      setColumnQty(2)
    } else {
      setColumnQty(3)
    }
  }

  // sort Paintings into columns
  const SortIntoColumns = () => {
    if (paintings.length > 0 && photos.length > 0) {
      // Check if correct rows to fill all paintings will
      // be created per column. If not, add one more row
      let rows = Math.round(paintings.length / columnQty)
      const paintingsCountApprox = rows * columnQty
      if (paintingsCountApprox < paintings.length) {
        rows += 1
      }

      const columns = []
      for (let i = 0; i < columnQty; i += 1) {
        const col = []
        let index = i

        for (let j = 0; j < rows; j += 1) {
          if (index < paintings.length) {
            paintings[index].image = photos[index].src.large2x
            paintings[index].index = index
            col.push(paintings[index])
          }
          index += columnQty
        }
        if (col.length > 0) {
          columns.push(col)
        }
      }

      // console.log('Columns', columns)

      return columns.map((column) => (
        <div key={column[0].slug} className="paintings_column">
          {column.map((painting) => (
            <div key={painting.id} className="painting">
              <Card
                style={{
                  width: '100%',
                  borderRadius: 8,
                  boxShadow: 'rgb(140 152 164 / 18%) 0px 0px 14px 0px',
                }}
              >
                <CardMedia
                  component="img"
                  src={painting.image}
                  alt={painting.title}
                />
              </Card>
            </div>
          ))}
        </div>
      ))
    }
    return ''
  }

  return (
    <div className="paintings_containter">
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
          <SortIntoColumns />
        </div>
      </Grid>
    </div>
  )
}

export default Paintings
