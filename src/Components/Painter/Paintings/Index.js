import { Button, Typography, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getPhotos, getPublicData } from "../../../utils/Helpers";
import ImagesDialog from "./ImagesDialog";
import NewDialog from "./NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [paintings, setPaintings] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    getPhotos(setPhotos, "painting");
    getPublicData(setPaintings, `/${path}/paintings`);
  }, [path]);

  const handleOpenImages = (painting) => {
    setSelected([painting, paintings[6]]);
    setOpenImages(true);
    // console.log(painting);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
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
            onClick={() => handleOpenImages(painting)}
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
      <IsLoggedIn path={path} />
      <div className="row">
        <AddPhotos />
      </div>
      <ImagesDialog
        paintings={selected}
        open={openImages}
        handleClose={handleCloseImages}
        show
      />
    </div>
  );
};

const IsLoggedIn = function IsLoggedIn({ path }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const [openNew, setOpenNew] = useState(false);
  const [painter, setPainter] = useState(false);

  useEffect(() => {
    getPublicData(setPainter, `/${path}`);
  }, [path]);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const newOpenCategory = () => {};

  if (currentUser && painter.id) {
    return (
      <div className="row" style={{ marginTop: 25, marginLeft: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          New Painting
        </Button>
        <Button
          style={{ width: 200, height: 40 }}
          variant="contained"
          color="primary"
          onClick={() => newOpenCategory()}
        >
          New Category
        </Button>
        <NewDialog
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

export default Index;
