import React, { useEffect, useState } from "react";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import one from "../../images/slide/1.png";
import two from "../../images/slide/2.png";
import three from "../../images/slide/3.png";
import four from "../../images/slide/4.png";
import five from "../../images/slide/5.png";
import six from "../../images/slide/6.png";
import { getResource } from "../../utils/requests";

const FrontTwo = function FrontTwo() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const images = [one, four, two, five, three, six];

  function handleResize() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Carousel controls={false} indicators={false}>
        {images.map((image) => {
          return (
            <Carousel.Item key={image} interval={6000}>
              <CardMedia
                className="d-block w-100"
                component="img"
                src={image}
                alt={image}
                sx={{ height: `${height}px`, width: `${width}px` }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
      <PaintersButtons />
    </div>
  );
};

const PaintersButtons = function PaintersButtons() {
  const [painters, setPainters] = useState([]);
  const [colorOne, setColorOne] = useState("white");
  const [colorTwo, setColorTwo] = useState("white");

  const hoverColor = (which) => {
    if (which === "one") {
      setColorOne("525252");
    } else {
      setColorTwo("525252");
    }
  };

  const defaultColor = (which) => {
    if (which === "one") {
      setColorOne("white");
    } else {
      setColorTwo("white");
    }
  };

  useEffect(() => {
    getResource("/", setPainters);
  }, []);

  if (painters.length > 1) {
    return (
      <Grid
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        sx={{
          margin: 0,
          padding: 0,
          height: "100vh",
          position: "absolute",
          top: 0,
        }}
        container
      >
        <Grid item sx={{ margin: 0, padding: 0 }}>
          <Link to={`/${painters[0].slug}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              onMouseEnter={() => hoverColor("one")}
              onMouseLeave={() => defaultColor("one")}
              sx={{
                borderRadius: "4px",
                border: "2px solid white",
                backgroundColor: "transparent",
                ":hover": {
                  border: "2px solid white",
                  backgroundColor: "white",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: colorOne,
                }}
              >
                {painters[0].name}
              </Typography>
            </Button>
            <Typography
              sx={{
                paddingTop: "5px",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: "white",
                textAlign: "center",
              }}
            >
              Realism
            </Typography>
          </Link>
        </Grid>
        <Grid item sx={{ margin: 0, padding: 0 }}>
          <Link to={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              onMouseEnter={() => hoverColor("two")}
              onMouseLeave={() => defaultColor("two")}
              sx={{
                borderRadius: "4px",
                border: "2px solid white",
                ":hover": {
                  border: "2px solid white",
                  backgroundColor: "white",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: colorTwo,
                }}
              >
                {painters[1].name}
              </Typography>
            </Button>
            <Typography
              sx={{
                paddingTop: "5px",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: "white",
                textAlign: "center",
              }}
            >
              Abstractionism
            </Typography>
          </Link>
        </Grid>
      </Grid>
    );
  }
  return "";
};

export default FrontTwo;
