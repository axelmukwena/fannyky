import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Loading from "../Loading/Loading";
import styles from "../../styles/home.module.css";
import NextLink from "../NextLink";
import ImageLoader from "../ImageLoader";

const Home = function Home({ paintersData }) {
  const originalBuda = "/static/assets/backgrounds/original-buda.png";
  const mediumBuda = "/static/assets/backgrounds/400-buda.png";
  const smallBuda = "/static/assets/backgrounds/300-buda.png";

  const originalFanny = "/static/assets/backgrounds/original-fanny.png";
  const mediumFanny = "/static/assets/backgrounds/400-fanny.png";
  const smallFanny = "/static/assets/backgrounds/300-fanny.png";

  const [painters, setPainters] = useState(null);
  const [width, setWidth] = useState(0);

  // Reverse the painters entered in the database
  function parsePainters(data) {
    const images = [
      { original: originalBuda, medium: mediumBuda, small: smallBuda },
      { original: originalFanny, medium: mediumFanny, small: smallFanny },
    ];
    const captions = ["Realism", "Abstractionism"];
    for (let i = 0; i < data.length; i += 1) {
      data[i].image = images[i];
      data[i].caption = captions[i];
    }

    setPainters(data);
  }

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (paintersData) {
      parsePainters(paintersData);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [paintersData]);

  if (!painters) return <Loading />;

  return (
    <Grid
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      className="gradient-background"
      style={{ margin: 0, padding: 0, height: "100vh" }}
      container
    >
      {painters.map((painter) => {
        return (
          <Grid key={painter.slug} item sx={{ margin: 0, padding: 0 }}>
            <NextLink
              href="[painterSlug]"
              as={`/${painter.slug}`}
              style={{ textDecoration: "none" }}
            >
              <Painter painter={painter} width={width} />
            </NextLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

const Painter = function Painter({ painter, width }) {
  if (painter) {
    return (
      <Button
        variant="outlined"
        size="large"
        fullWidth
        disableRipple
        sx={{
          backgroundColor: "transparent",
          borderRadius: "100%",
          border: "none",
          textTransform: "none",
          width: "fit-content",
          height: "fit-content",
          ":hover": {
            border: "none",
            backgroundColor: "transparent",
          },
        }}
      >
        {width < 600 && (
          <Image
            loader={ImageLoader}
            src={painter.image.small}
            alt={painter.name}
            width={230}
            height={230}
            className={styles.image}
          />
        )}

        {width >= 600 && width < 900 && (
          <Image
            src={painter.image.medium}
            alt={painter.name}
            width={250}
            height={250}
            className={styles.image}
          />
        )}

        {width >= 900 && (
          <Image
            src={painter.image.medium}
            alt={painter.name}
            width={400}
            height={400}
            className={styles.image}
          />
        )}

        <Grid container sx={{ position: "absolute" }}>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: "1.5rem",
                "@media (min-width: 600px)": {
                  fontSize: "2rem",
                },
                fontFamily: "Roboto",
                color: "white",
                textAlign: "center",
              }}
            >
              {painter.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: "1rem",
                "@media (min-width: 600px)": {
                  fontSize: "1rem",
                },
                color: "white",
                textAlign: "center",
              }}
            >
              {painter.caption}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    );
  }
  return null;
};

// eslint-disable-next-line no-unused-vars
const PainterDummy = function PainterDummy({ painter }) {
  if (painter) {
    return (
      <Link href={`/${painter.slug}`} style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          size="large"
          fullWidth
          sx={{
            borderRadius: "100%",
            border: "none",
            backgroundImage: `url(${painter.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            textTransform: "none",
            height: "230px",
            width: "230px",
            "@media (min-width: 600px)": {
              height: "250px",
              width: "250px",
            },
            "@media (min-width: 900px)": {
              height: "400px",
              width: "400px",
            },
            ":hover": {
              border: "none",
            },
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: "1.5rem",
                  "@media (min-width: 600px)": {
                    fontSize: "2rem",
                  },
                  fontFamily: "Roboto",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {painter.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "1rem",
                  "@media (min-width: 600px)": {
                    fontSize: "1rem",
                  },
                  color: "white",
                  textAlign: "center",
                }}
              >
                {painter.caption}
              </Typography>
            </Grid>
          </Grid>
        </Button>
      </Link>
    );
  }
  return null;
};

export default Home;
