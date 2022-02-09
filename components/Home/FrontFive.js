import { useEffect, useState } from "react";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { getResource } from "../../utilities/requests";

const FrontFive = function FrontFive() {
  const backgroundDesktop = "/static/assets/background-desktop.png";

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

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
    <>
      <CardMedia
        component="img"
        src={backgroundDesktop}
        alt={backgroundDesktop}
        sx={{ width: `${width}px`, height: `${height}px` }}
      />
      <PaintersButtons width={width} height={height} />
    </>
  );
};

// eslint-disable-next-line no-unused-vars
const PaintersButtons = function PaintersButtons({ width, height }) {
  const [painters, setPainters] = useState([]);

  let mob = true;
  if (width > 900) {
    mob = false;
  }

  useEffect(() => {
    getResource("/", setPainters);
  }, []);

  if (painters.length > 1) {
    return (
      <Grid
        container
        direction="row"
        justifyContent={mob ? "space-evenly" : "flex-start"}
        alignItems={mob ? "flex-end" : "center"}
        spacing={mob ? 0 : 12}
        sx={{
          margin: 0,
          padding: 0,
          height: `${height}px`,
          "@media (max-width: 900px)": {
            height: `${height - 40}px`,
          },
          position: "absolute",
          top: 0,
          width,
        }}
      >
        <Grid
          item
          sx={{
            paddingTop: "0px !important",
          }}
        >
          <a href={`/${painters[0].slug}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: "4px",
                border: "2px solid #4c7dbb",
                backgroundColor: "#4c7dbb",
                ":hover": {
                  border: "2px solid #2b60a5",
                  backgroundColor: "#2b60a5",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
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
                color: "#4c7dbb",
                textAlign: "center",
              }}
            >
              Realism
            </Typography>
          </a>
        </Grid>
        <Grid
          item
          sx={{
            paddingTop: "0px !important",
          }}
        >
          <a href={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: "4px",
                border: "2px solid #4c7dbb",
                backgroundColor: "#4c7dbb",
                ":hover": {
                  border: "2px solid #2b60a5",
                  backgroundColor: "#2b60a5",
                },
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "white",
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
                color: "#4c7dbb",
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

export default FrontFive;
