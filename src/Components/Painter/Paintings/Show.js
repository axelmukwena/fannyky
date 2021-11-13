import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { getPhotos, getPublicData } from "../../../utils/Helpers";
import Images from "./Images";

const Show = function Show({ match }) {
  const [painting, setPainting] = useState({});
  const { url } = match;

  useEffect(() => {
    getPublicData(setPainting, url);
  }, [url]);

  return (
    <div>
      <SetImages />
      <Typography>{painting.title}</Typography>
      <DateCreated painting={painting} />
      <Typography>{painting.abstract}</Typography>
      <Typography>{painting.dimension}</Typography>
      <Typography>{painting.explorer}</Typography>
      <Typography>{painting.description}</Typography>
    </div>
  );
};

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created) {
    return <Typography>{painting.date_created.split("-")[0]}</Typography>;
  }
  return "";
};

const SetImages = function SetImages() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos(setPhotos, "painting");
  }, []);

  if (photos.length > 0) {
    return <Images images={photos.slice(0, 3)} />;
  }
  return "";
};

export default Show;
