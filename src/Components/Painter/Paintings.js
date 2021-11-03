import { Button, Card, Grid, Link, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getPublicData } from '../../utils/Helpers'

const Paintings = () => {
  const [paintings, setPaintings] = useState([])
  const { path } = useRouteMatch()

  const url = `/${path}/paintings`
  useEffect(() => {
    getPublicData(setPaintings, url)
  }, [url])

  const handleOpen = () => {}

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
          <Grid item lg={4} md={6} xs={12}>
            <Card key={painting.id} style={{ width: '100%', padding: 10 }}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Paintings
