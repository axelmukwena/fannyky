import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import "./Home.css";
import { getResource } from "../../utils/requests";
import budaBackground from "../../images/buda-background.png";
import fannyBackground from "../../images/fanny-background.png";

const Second = function Second() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [painters, setPainters] = useState([]);

  function handleResize() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  // Reverse the painters entered in the database
  function parsePainters(data) {
    data = data.reverse();
    setPainters(data);
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

  return (
    <div
      className="canvas-container"
      id="canvas-container"
      style={{ backgroundColor: "#f1f1f1" }}
    >
      <Grid
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        style={{ margin: 0, padding: 0, width, height }}
        container
        spacing={2}
      >
        <Grid item style={{ margin: 0, padding: 0 }}>
          <PainterOne painters={painters} />
        </Grid>
        <Grid item style={{ margin: 0, padding: 0 }}>
          <PainterTwo painters={painters} />
        </Grid>
      </Grid>
    </div>
  );
};

const PainterOne = function PainterOne({ painters }) {
  if (painters.length > 1) {
    return (
      <Link to={`/${painters[0].slug}`} style={{ textDecoration: "none" }}>
        <Button
          // className="button-one"
          variant="outlined"
          size="large"
          style={{
            borderRadius: "100%",
            height: 400,
            width: 400,
            border: "2px solid #e7e7e7",
            backgroundImage: `url(${budaBackground})`,
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
            {painters[0].name}
          </Typography>
        </Button>
      </Link>
    );
  }
  return "";
};

const PainterTwo = function PainterTwo({ painters }) {
  if (painters.length > 1) {
    return (
      <Link to={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
        <Button
          // className="button-two"
          variant="outlined"
          size="large"
          style={{
            borderRadius: "100%",
            height: 400,
            width: 400,
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
      </Link>
    );
  }
  return "";
};

export default Second;
