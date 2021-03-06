import React, { useEffect, useState } from "react";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import { getResource } from "../../utilities/requests";

const FrontTwo = function FrontTwo() {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const images = [
    "/static/assets/slide/1.png",
    "/static/assets/slide/4.png",
    "/static/assets/slide/2.png",
    "/static/assets/slide/5.png",
    "/static/assets/slide/3.png",
    "/static/assets/slide/6.png",
  ];

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
            <Carousel.Item
              key={image}
              interval={6000}
              style={{ color: "red", marginRight: "-150%" }}
            >
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
          <a href={`/${painters[0].slug}`} style={{ textDecoration: "none" }}>
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
          </a>
        </Grid>
        <Grid item sx={{ margin: 0, padding: 0 }}>
          <a href={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
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
          </a>
        </Grid>
      </Grid>
    );
  }
  return "";
};

export default FrontTwo;
