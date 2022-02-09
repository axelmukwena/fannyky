import React, { useEffect, useState } from "react";
import { Button, CardMedia, Grid, Typography } from "@mui/material";

import { getResource } from "../../utilities/requests";

const FrontFour = function FrontFour() {
  const one = "/static/assets/slide/1.png";

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  function handleResize() {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }

  function handlleRipple() {
    // eslint-disable-next-line no-undef
    // console.log($(".active.carousel-item > .ripples"));
    // eslint-disable-next-line no-undef
    $(".ripples").ready(function foo() {
      // eslint-disable-next-line no-undef
      $(".ripples").ripples({
        resolution: 512,
        dropRadius: 20,
        perturbance: 0.002,
      });
    });
  }

  function handleBackground() {
    const interval = setInterval(() => {
      handlleRipple();
    }, 4500);
    return interval;
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    handlleRipple();
    const interval = handleBackground();

    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(interval);
    };
  }, []);

  return (
    <>
      <CardMedia
        className="ripples"
        // component="img"
        image={one}
        // alt={image}
        sx={{ height: `${height}px`, width: `${width}px` }}
      />
      <ManualPaintersButtons />
    </>
  );
};

const ManualPaintersButtons = function ManualPaintersButtons() {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    getResource("/", setPainters);
  }, []);

  if (painters.length > 1) {
    return (
      <div className="buttons-container">
        <a href={`/${painters[0].slug}`}>
          <Button
            className="button-one"
            variant="outlined"
            size="large"
            style={{
              borderRadius: 4,
              border: "2px solid #e7e7e7",
              // backgroundColor: "#e7e7e7",
            }}
          >
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              {painters[0].name}
            </Typography>
          </Button>
          <Typography
            className="caption-one"
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
        <a href={`/${painters[1].slug}`}>
          <Button
            className="button-two"
            variant="outlined"
            size="large"
            style={{
              borderRadius: 4,
              border: "2px solid #e7e7e7",
              // backgroundColor: "#e7e7e7",
            }}
          >
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              {painters[1].name}
            </Typography>
          </Button>
          <Typography
            className="caption-two"
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
        <PositionButtons />
      </div>
    );
  }
  return "";
};

const PositionButtons = function PositionButtons() {
  function handleResize() {
    const height = window.innerHeight;
    const width = window.innerWidth / 4;

    const firstButton = document.querySelector(".button-one");
    firstButton.style.marginTop = `-${height / 2 + 20}px`;
    firstButton.style.marginLeft = `${width - firstButton.offsetWidth / 2}px`;

    const secondButton = document.querySelector(".button-two");
    secondButton.style.marginTop = `-${height / 2 + 20}px`;
    secondButton.style.marginLeft = `${
      3 * width - secondButton.offsetWidth / 2
    }px`;

    const firstCaption = document.querySelector(".caption-one");
    firstCaption.style.marginTop = `-${height / 2 - 20}px`;
    firstCaption.style.marginLeft = `${width - firstCaption.offsetWidth / 2}px`;

    const secondCaption = document.querySelector(".caption-two");
    secondCaption.style.marginTop = `-${height / 2 - 20}px`;
    secondCaption.style.marginLeft = `${
      3 * width - secondCaption.offsetWidth / 2
    }px`;
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return "";
};

// eslint-disable-next-line no-unused-vars
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

export default FrontFour;
