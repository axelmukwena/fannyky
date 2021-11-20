import { Button, Grid, Typography, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getPhotos, getPublicData } from "../../../utils/Helpers";
import PaintingDialog from "./PaintingDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [paintings, setPaintings] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getPhotos(setPhotos, "painting");
    getPublicData(setPaintings, `/${path}/paintings`);
  }, [path]);

  const handleOpen = (painting) => {
    setSelected([painting, paintings[6]]);
    setOpen(true);
    // console.log(painting);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const AddPhotos = function AddPhotos() {
    if (paintings.length > 0 && photos.length > 0) {
      // console.log(photos[0].src);
      for (let i = 0; i < paintings.length; i += 1) {
        // const parsed = parsePexelImage(photos[i].src.tiny);
        paintings[i].image = photos[i].src.original;
      }

      return paintings.map((painting) => (
        <div key={painting.slug} className="painting">
          <CardMedia
            component="img"
            src={`${painting.image}?w=700&h=700&fit=crop&auto=format`}
            alt={painting.title}
            loading="lazy"
            className="painting-image"
            onClick={() => handleOpen(painting)}
            style={{ cursor: "pointer" }}
          />
          <div className="abstract">
            <Link
              to={`${painting.painter.slug}/paintings/${painting.slug}`}
              className="painting-title-index"
            >
              {painting.title}
            </Link>
            <Typography style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
              {painting.date_created.split("-")[0]} - {painting.abstract}
            </Typography>
          </div>
        </div>
      ));
    }
    return "";
  };

  return (
    <div className="paintings-containter">
      <IsLoggedIn />
      <div className="row">
        <AddPhotos />
      </div>
      <PaintingDialog
        paintings={selected}
        open={open}
        handleClose={handleClose}
        show
      />
    </div>
  );
};

const IsLoggedIn = function IsLoggedIn() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const handleOpen = () => {};

  if (currentUser) {
    return (
      <Grid container spacing={4} style={{ marginBottom: 10 }}>
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
