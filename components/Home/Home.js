/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { getResource } from "../../utilities/requests";
import Loading from "../Loading/Loading";
import styles from "../../styles/home.module.css";

const Home = function Home() {
  const budaBackground = "/static/assets/buda-background.png";
  const fannyBackground = "/static/assets/fanny-background.png";

  const [painters, setPainters] = useState(null);
  const [width, setWidth] = useState(0);

  // Reverse the painters entered in the database
  function parsePainters(data) {
    const images = [budaBackground, fannyBackground];
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
    getResource("/", parsePainters);
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!painters) {
    return <Loading />;
  }
  return (
    <Grid
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      style={{ margin: 0, padding: 0, height: "100vh" }}
      container
    >
      {painters.map((painter) => {
        return (
          <Grid key={painter.slug} item sx={{ margin: 0, padding: 0 }}>
            <Link href={`/${painter.slug}`} style={{ textDecoration: "none" }}>
              <a>
                <Painter painter={painter} width={width} />
              </a>
            </Link>
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
            src={painter.image}
            alt={painter.name}
            width={230}
            height={230}
            style={{ position: "relative", borderRadius: "100%" }}
          />
        )}

        {width < 600 && width < 900 && (
          <Image
            src={painter.image}
            alt={painter.name}
            width={250}
            height={250}
            style={{ position: "relative", borderRadius: "100%" }}
          />
        )}

        {width >= 900 && (
          <Image
            src={painter.image}
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
