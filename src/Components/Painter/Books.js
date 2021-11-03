import { Button, Card, Grid, Link, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { getPublicData } from '../../utils/Helpers'

const Books = () => {
  const [books, setBooks] = useState([])
  const { path } = useRouteMatch()

  useEffect(() => {
    getPublicData(setBooks, path)
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
            New Book
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item lg={4} md={6} xs={12}>
            <Card key={book.id} style={{ width: '100%', padding: 10 }}>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {book.painter.name}
              </Typography>
              <Link href={`${path}/${book.slug}`}>
                <Typography
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {book.title}
                </Typography>
              </Link>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {book.decription}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {book.link}
              </Typography>
              <Typography
                style={{
                  fontWeight: 300,
                }}
              >
                {book.published_year}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default Books
