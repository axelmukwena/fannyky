import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography, Box, CircularProgress } from "@mui/material";
import "./Home.css";
import { getResource } from "../../utils/requests";
import budaBackground from "../../images/buda-background.png";
import fannyBackground from "../../images/fanny-background.png";

const Second = function Second() {
  const [painters, setPainters] = useState(null);

  // Reverse the painters entered in the database
  function parsePainters(data) {
    const images = [budaBackground, fannyBackground];
    for (let i = 0; i < data.length; i += 1) {
      data[i].image = images[i];
    }

    setPainters(data);
  }

  useEffect(() => {
    getResource("/", parsePainters);
  }, []);

  if (!painters) {
    return (
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ margin: 0, padding: 0, height: "100vh" }}
        container
        spacing={2}
      >
        <Grid item>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </Grid>
      </Grid>
    );
  }
  return (
    <div
      className="canvas-container"
      id="canvas-container"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <Grid
        direction="row"
        justifyContent="center"
        alignItems="center"
        style={{ margin: 0, padding: 0, height: "100vh" }}
        container
        spacing={2}
      >
        {painters.map((painter) => {
          return (
            <Grid
              key={painter.slug}
              item
              xs={12}
              sm={6}
              style={{ margin: 0, padding: 0 }}
            >
              <Grid
                direction="row"
                justifyContent="center"
                alignItems="center"
                container
              >
                <Grid item style={{ margin: 0, padding: 0 }}>
                  <Painter painter={painter} />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

const Painter = function Painter({ painter }) {
  if (painter) {
    return (
      <Link to={`/${painter.slug}`} style={{ textDecoration: "none" }}>
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
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: "1.5rem",
              "@media (min-width: 600px)": {
                fontSize: "2rem",
              },
              fontFamily: "Roboto",
              color: "white",
            }}
          >
            {painter.name}
          </Typography>
        </Button>
      </Link>
    );
  }
  return "";
};

export default Second;

// eslint-disable-next-line no-lone-blocks
{
  /* <Link to={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
        <Button
          // className="button-two"
          variant="outlined"
          size="large"
          fullWidth
          style={{
            borderRadius: "100%",
            border: "2px solid #e7e7e7",
            backgroundImage: `url(${fannyBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            textTransform: "none",
          }}
        >
          <Typography
            style={{
              fontWeight: 900,
              fontSize: "2rem",
              fontFamily: "Roboto",
              color: "white",
            }}
          >
            {painters[1].name}
          </Typography>
        </Button>
      </Link> */
}
