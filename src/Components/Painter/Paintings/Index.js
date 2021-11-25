import { DeleteOutline } from "@mui/icons-material";
import { Button, Typography, CardMedia, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import ImagesDialog from "./ImagesDialog";
import NewDialog from "./New/NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [paintings, setPaintings] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getResource(`${path}/paintings`, setPaintings);
  }, [path]);

  const handleOpenImages = (painting) => {
    setSelected(painting);
    setOpenImages(true);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
  };

  const AddPhotos = function AddPhotos() {
    if (paintings.length > 0) {
      // console.log(paintings);
      return paintings.map((painting) => (
        <div key={painting.slug} className="painting">
          <CardImage painting={painting} handleOpenImages={handleOpenImages} />
          <div className="abstract">
            <Link
              to={`${painting.painter.slug}/paintings/${painting.slug}`}
              className="painting-title-index"
            >
              {painting.title}
            </Link>
            <DateCreated painting={painting} />
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
      <ImagesDialog
        painting={selected}
        current={current}
        setCurrent={setCurrent}
        open={openImages}
        handleClose={handleCloseImages}
        show
      />
    </div>
  );
};

const CardImage = function CardImage({ painting, handleOpenImages }) {
  if (painting.images.length > 0) {
    return (
      <Card
        id={painting.images[0].url}
        className="loaded-files"
        elevation={0}
        style={{
          padding: 0,
          margin: 0,
          position: "relative",
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          // src={`${painting.image}?w=700&h=700&fit=crop&auto=format`}
          src={`${painting.images[0].url}?w=700&h=700&fit=crop&auto=format`}
          alt={painting.title}
          loading="lazy"
          className="painting-image"
          width={150}
          height={150}
          onClick={() => handleOpenImages(painting)}
          style={{ cursor: "pointer" }}
        />
        <DeleteImage painting={painting} />
      </Card>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ painting }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const deleteImg = () => {
    const path = `/${painter.id}/paintings/${painting.id}/`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter.id) {
    return (
      <DeleteOutline
        onClick={() => deleteImg()}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 0,
          cursor: "pointer",
          color: "black",
          fontSize: 21,
          backgroundColor: "rgb(255 255 255 / 28%)",
          borderRadius: "2px",
        }}
      />
    );
  }
  return null;
};

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created) {
    return (
      <Typography style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
        {painting.date_created.split("-")[0]} - {painting.abstract}
      </Typography>
    );
  }
  return (
    <Typography style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
      {painting.abstract}
    </Typography>
  );
};

const IsLoggedIn = function IsLoggedIn() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

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
          painting={false}
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
