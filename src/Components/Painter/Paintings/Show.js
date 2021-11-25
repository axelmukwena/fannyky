import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import ImagesDialog from "./ImagesDialog";
import { getResource, postResource } from "../../../utils/requests";
import NewDialog from "./New/NewDialog";

const Show = function Show({ match }) {
  const { url } = match;
  const [painting, setPainting] = useState({});
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getResource(url, setPainting);
  }, [url]);

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (painting.id) {
    const { images } = painting;
    return (
      <div>
        <IsLoggedIn painting={painting} />
        <div className="row">
          {images.map((image, index) => (
            <Card
              key={image.url}
              id={image.url}
              className="loaded-files"
              elevation={0}
              style={{
                padding: 0,
                margin: 20,
                position: "relative",
                borderRadius: 0,
              }}
            >
              <CardMedia
                src={`${image.url}?w=700&h=700&fit=crop&auto=format`}
                alt={painting.title}
                loading="lazy"
                component="img"
                onClick={() => handleOpen(index)}
                style={{
                  cursor: "pointer",
                  width: 250,
                  height: 250,
                }}
              />
              <DeleteImage painting={painting} index={index} />
            </Card>
          ))}
        </div>
        <ImagesDialog
          painting={painting}
          current={current}
          setCurrent={setCurrent}
          open={open}
          handleClose={handleClose}
          show={false}
        />
        <div className="painting-show-content">
          <Typography
            style={{
              fontWeight: 900,
              fontSize: "1.4rem",
              fontFamily: "Roboto",
              flex: 1,
            }}
          >
            {painting.title}
          </Typography>
          <Typography
            style={{ fontSize: "1rem", fontStyle: "italic", marginBottom: 20 }}
          >
            <DateCreated painting={painting} /> - {painting.painter.name}
          </Typography>

          <Typography style={{ fontSize: "1rem" }}>
            {painting.abstract}
          </Typography>
          <Typography>{painting.dimension}</Typography>
          <Typography>{painting.explorer}</Typography>
          <Typography style={{ marginTop: 20 }}>
            {painting.description}
          </Typography>
        </div>
      </div>
    );
  }
  return "";
};

const DeleteImage = function DeleteImage({ painting, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const deleteImg = () => {
    const path = `/${painter.id}/paintings/${painting.id}/image`;
    const imageId = painting.images[index].content.id;
    const params = { id: painting.id, image_id: imageId, painter };

    postResource(`${path}`, params, handleImagesResponse);
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

const IsLoggedIn = function IsLoggedIn({ painting }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (currentUser && painter.id) {
    return (
      <div className="row" style={{ marginTop: 25, marginLeft: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          Edit Painting
        </Button>
        <NewDialog
          painting={painting}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created) {
    return painting.date_created.split("-")[0];
  }
  return "";
};

export default Show;
