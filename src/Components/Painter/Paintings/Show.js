import React, { useEffect, useState } from "react";
import { CardMedia, Typography } from "@mui/material";
import { getPhotos, getPublicData } from "../../../utils/Helpers";

const Show = function Show({ match }) {
  const [painting, setPainting] = useState({});
  const [photos, setPhotos] = useState([]);
  const { url } = match;

  useEffect(() => {
    getPublicData(setPainting, url);
    getPhotos(setPhotos, "painting");
  }, [url]);

  if (painting.id && photos.length > 0) {
    return (
      <div>
        <div className="row">
          <SetImages photos={photos.slice(0, 3)} title={painting.title} />
        </div>
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

const SetImages = function SetImages({ photos, title }) {
  if (photos.length > 0) {
    return photos.map((photo) => (
      <CardMedia
        key={photo.src.original}
        src={`${photo.src.original}?w=700&h=700&fit=crop&auto=format`}
        alt={title}
        loading="lazy"
        component="img"
        // onClick={() => handleOpen(painting)}
        style={{ cursor: "pointer" }}
        className="painting-image-show"
      />
    ));
  }
  return "";
};

export default Show;
