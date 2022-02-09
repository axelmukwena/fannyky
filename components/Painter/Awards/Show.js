import React, { useState } from "react";
import { CardMedia, Typography, Button, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import ImagesDialog from "../ImagesDialog";
import { deleteResource, postResource } from "../../../utilities/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";
import Toast from "../../../utilities/toast";

const Show = function Show({ award }) {
  if (award) {
    return (
      <div style={{ marginTop: "15px" }}>
        <IsLoggedIn award={award} />
        <Grid container spacing={2}>
          <GetImages award={award} />

          <Grid item xs={12} sm={award.images.length > 0 ? 6 : 12}>
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
          </Grid>
        </Grid>
      </div>
    );
  }

  return "";
};

const GetImages = function GetImages({ award }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrent(0);
  };

  const { images } = award;

  if (images.length <= 0) {
    return null;
  }

  return (
    <Grid
      item
      xs={12}
      sm={6}
      sx={{ paddingLeft: "0 !important", paddingTop: "0 !important" }}
    >
      <div className="row">
        {images.map((image, index) => (
          <Card
            key={image.medium}
            elevation={0}
            style={{
              padding: 0,
              margin: "20px 20px 20px 20px",
              position: "relative",
              borderRadius: 0,
            }}
          >
            <CardMedia
              src={image.medium}
              alt={award.prize}
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
        resource={award}
        current={current}
        setCurrent={setCurrent}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

const DeleteImage = function DeleteImage({ award, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/awards/${award.id}/image`;
    const imageId = award.images[index].content.id;
    const params = { id: award.id, image_id: imageId, painter };

    postResource(path, params, handleImagesResponse);
  };

  if (currentUser && painter) {
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
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteAward = () => {
    const path = `/${painter.id}/awards/${award.id}`;

    deleteResource(`${path}`, handleDeleleResponse);
  };

  if (currentUser && painter) {
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
