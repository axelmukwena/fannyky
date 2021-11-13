import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getPhotos, getPublicData } from "../../../utils/Helpers";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [paintings, setPaintings] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [columnQty, setColumnQty] = useState(1);

  // On screen width changes
  const handleResize = () => {
    if (window.innerWidth < 540) {
      setColumnQty(1);
    } else if (window.innerWidth <= 1024) {
      setColumnQty(2);
    } else {
      setColumnQty(3);
    }
  };

  useEffect(() => {
    getPhotos(setPhotos, "painting");
    getPublicData(setPaintings, `/${path}/paintings`);
    // Initialize size
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [path]);

  const handleShowImages = () => {};

  // sort Paintings into columns
  const SortIntoColumns = () => {
    if (paintings.length > 0 && photos.length > 0) {
      // Check if correct rows to fill all paintings will
      // be created per column. If not, add one more row
      let rows = Math.round(paintings.length / columnQty);
      const paintingsCountApprox = rows * columnQty;
      if (paintingsCountApprox < paintings.length) {
        rows += 1;
      }

      const columns = [];
      for (let i = 0; i < columnQty; i += 1) {
        const col = [];
        let index = i;

        for (let j = 0; j < rows; j += 1) {
          if (index < paintings.length) {
            paintings[index].image = photos[index].src.large;
            paintings[index].index = index;
            col.push(paintings[index]);
          }
          index += columnQty;
        }
        if (col.length > 0) {
          columns.push(col);
        }
      }

      // console.log('Columns', columns)

      return columns.map((column) => (
        <div key={column[0].slug} className="paintings-column">
          {column.map((painting) => (
            <div key={painting.id} className="painting">
              <Card
                onClick={handleShowImages}
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: 0,
                  cursor: "pointer",
                  boxShadow: "rgb(140 152 164 / 18%) 0px 0px 14px 0px",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  // className="index-image"
                  src={painting.image}
                  alt={painting.title}
                />
              </Card>
              <div className="abstract">
                <Link
                  to={`${painting.painter.slug}/paintings/${painting.slug}`}
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#8b8b8b",
                    textDecoration: "none",
                  }}
                >
                  {painting.title}
                </Link>
                <Typography style={{ fontSize: "0.8rem" }}>
                  {painting.date_created.split("-")[0]}
                </Typography>
                <Typography style={{ fontSize: "0.8rem" }}>
                  {painting.abstract}
                </Typography>
                <Typography style={{ fontSize: "0.8rem" }}>
                  {painting.dimension}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ));
    }
    return "";
  };

  return (
    <div className="paintings-containter">
      <IsLoggedIn />
      <Grid container spacing={4}>
        <div className="paintings">
          <SortIntoColumns />
        </div>
      </Grid>
    </div>
  );
};

const IsLoggedIn = function IsLoggedIn() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const handleOpen = () => {};

  if (currentUser) {
    return (
      <Grid container spacing={2} style={{ marginBottom: 10 }}>
        <Grid item lg={3} md={6} xs={6}>
          <Button
            style={{ width: "100%", height: 40 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            New Painting
          </Button>
        </Grid>
        <Grid item lg={3} md={6} xs={6}>
          <Button
            style={{ width: "100%", height: 40 }}
            variant="contained"
            color="primary"
            onClick={handleOpen}
          >
            New Category
          </Button>
        </Grid>
      </Grid>
    );
  }
  return "";
};

export default Index;
