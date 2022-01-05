import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import "./Home.css";
import { getResource } from "../../utils/requests";
import budaBackground from "../../images/buda-background.png";
import fannyBackground from "../../images/fanny-background.png";
import Loading from "../Loading/Loading";

const Home = function Home() {
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
          <Grid
            key={painter.slug}
            item
            // xs={12}
            // sm={6}
            style={{ margin: 0, padding: 0 }}
          >
            <Painter painter={painter} />
          </Grid>
        );
      })}
    </Grid>
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

export default Home;
