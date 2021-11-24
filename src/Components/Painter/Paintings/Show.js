import React, { useEffect, useState } from "react";
import { CardMedia, Typography } from "@mui/material";
import { getPhotos } from "../../../utils/helpers";
import ImagesDialog from "./ImagesDialog";
import { getResource } from "../../../utils/requests";

const Show = function Show({ match }) {
  const { url } = match;
  const [painting, setPainting] = useState({});
  const [photos, setPhotos] = useState([]);
  const [photosToPaintings, setPhotosToPaintings] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getResource(url, setPainting);
    getPhotos(setPhotos, "painting");
  }, [url]);

  const handleOpen = (paintingPhotos, title) => {
    const p = [];
    for (let i = 0; i < paintingPhotos.length; i += 1) {
      p.push({ image: paintingPhotos[i].src.original, title });
    }
    setPhotosToPaintings(p);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (painting.id && photos.length > 0) {
    return (
      <div>
        <div className="row">
          {photos.slice(0, 3).map((photo) => (
            <CardMedia
              key={photo.src.original}
              src={`${photo.src.original}?w=700&h=700&fit=crop&auto=format`}
              alt={painting.title}
              loading="lazy"
              component="img"
              onClick={() => handleOpen(photos.slice(0, 3), painting.title)}
              style={{ cursor: "pointer" }}
              className="painting-image-show"
            />
          ))}
        </div>
        <ImagesDialog
          paintings={photosToPaintings}
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

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created) {
    return painting.date_created.split("-")[0];
  }
  return "";
};

export default Show;
