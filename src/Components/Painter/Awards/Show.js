import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Button, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import ImagesDialog from "./ImagesDialog";
import {
  deleteResource,
  getResource,
  postResource,
} from "../../../utils/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";

const Show = function Show({ match }) {
  const { url } = match;
  const [award, setAward] = useState({});
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getResource(url, setAward);
  }, [url]);

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (award.id) {
    const { images } = award;
    let width = "45%";
    let padding = "16px 0 0 16px";
    if (images.length === 0) {
      width = "70%";
      padding = "0";
    }
    return (
      <div style={{}}>
        <IsLoggedIn award={award} />
        <Grid container spacing={2}>
          <Grid item style={{ width, padding }}>
            <div className="row">
              {images.map((image, index) => (
                <Card
                  key={image.url}
                  id={image.url}
                  className="loaded-files"
                  elevation={0}
                  style={{
                    padding: 0,
                    margin: "20px 20px 20px 20px",
                    position: "relative",
                    borderRadius: 0,
                  }}
                >
                  <CardMedia
                    src={`${image.url}?w=700&h=700&fit=crop&auto=format`}
                    alt={award.prize}
                    loading="lazy"
                    component="img"
                    onClick={() => handleOpen(index)}
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <DeleteImage award={award} index={index} />
                </Card>
              ))}
            </div>
            <ImagesDialog
              award={award}
              current={current}
              setCurrent={setCurrent}
              open={open}
              handleClose={handleClose}
            />
          </Grid>
          <Grid item style={{ width }}>
            <div className="show-content">
              <Typography
                style={{
                  fontWeight: 900,
                  fontSize: "1.4rem",
                  fontFamily: "Roboto",
                  flex: 1,
                }}
              >
                {award.prize}
              </Typography>

              <CustomHorizontal />

              <Typography>Artist: {award.painter.name}</Typography>

              <Typography style={{ marginTop: 8 }}>
                {award.year} — {award.description}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
  return "";
};

const DeleteImage = function DeleteImage({ award, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/awards/${award.id}/image`;
    const imageId = award.images[index].content.id;
    const params = { id: award.id, image_id: imageId, painter };

    postResource(path, params, handleImagesResponse);
  };

  if (currentUser && painter.id) {
    return (
      <DeleteOutline
        onClick={() => handleDeleteImage()}
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

const IsLoggedIn = function IsLoggedIn({ award }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const handleDeleleResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeleteAward = () => {
    const path = `/${painter.id}/awards/${award.id}`;

    deleteResource(`${path}`, handleDeleleResponse);
  };

  if (currentUser && painter.id) {
    return (
      <div>
        <div className="row" style={{ marginTop: 25, marginLeft: 25 }}>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleOpenNew()}
          >
            Edit Award
          </Button>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleDeleteAward()}
          >
            Delete Award
          </Button>
          <NewDialog
            award={award}
            painter={painter}
            open={openNew}
            handleClose={handleCloseNew}
          />
        </div>
        <CustomHorizontal />
      </div>
    );
  }
  return "";
};

export default Show;
