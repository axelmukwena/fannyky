import { Button, Card, Grid, Link, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getPublicData } from '../../utils/Helpers'

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([])
  const { path } = useRouteMatch()

  useEffect(() => {
    getPublicData(setExhibitions, path)
  }, [])

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
            New Exhibition
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {exhibitions.map((exhibition) => (
          <Grid item lg={4} md={6} xs={12}>
            <Card key={exhibition.id} style={{ width: '100%', padding: 10 }}>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.painter.name}
              </Typography>
              <Link href={`${path}/${exhibition.slug}`}>
                <Typography
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {exhibition.title}
                </Typography>
              </Link>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.start_date} {exhibition.end_date}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.link}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {exhibition.location}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Exhibitions
