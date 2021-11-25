import React, { useState } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { DeleteOutline, Email, Phone } from "@mui/icons-material";
import EditDialog from "./EditDialog";
import { postResource } from "../../../utils/requests";

const Biography = function Biography() {
  const painter = useSelector((state) => state.currentPainter.painter);

  const convertContentToHTML = (content) => {
    if (content) {
      const object = JSON.parse(content);
      const raw = convertFromRaw(object);
      const html = convertToHTML(raw);
      return html;
    }
    return null;
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  let about = convertContentToHTML(painter.about);
  about = createMarkup(about);

  return (
    <div
      className="biography-container"
      style={{ margin: "20px 15px", width: "100%" }}
    >
      <Grid container spacing={2} style={{ width: "70%" }}>
        <IsLoggedIn />

        <Grid item xs={12}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              fontFamily: "Roboto",
            }}
          >
            Biography
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <hr className="horizontal" />
        </Grid>

        <GetEmail painter={painter} />

        <GetPhone painter={painter} />

        <Grid item xs={12}>
          <hr className="horizontal" style={{ marginTop: 0 }} />
        </Grid>

        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Typography dangerouslySetInnerHTML={about} />
          <GetImage painter={painter} />
        </Grid>
      </Grid>
    </div>
  );
};

const GetEmail = function GetEmail({ painter }) {
  if (painter.email) {
    return (
      <Grid
        item
        style={{ width: "fit-content", display: "flex", alignItems: "center" }}
      >
        <Email style={{ fontSize: 19, marginRight: 7 }} />
        <Typography>{painter.email}</Typography>
      </Grid>
    );
  }
  return null;
};

const GetPhone = function GetPhone({ painter }) {
  if (painter.phone) {
    return (
      <Grid
        item
        style={{ width: "fit-content", display: "flex", alignItems: "center" }}
      >
        <Phone style={{ fontSize: 19, marginRight: 7 }} />
        <Typography>{painter.phone}</Typography>
      </Grid>
    );
  }
  return null;
};

const GetImage = function GetImage({ painter }) {
  if (painter.id && painter.images.length > 0) {
    const image = painter.images[0];
    return (
      <Card
        id={image.url}
        className="loaded-files"
        elevation={0}
        style={{
          width: "100%",
          marginLeft: 15,
          padding: 0,
          margin: "15px 0",
          position: "relative",
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          // src={`${painting.image}?w=700&h=700&fit=crop&auto=format`}
          src={`${image.url}`}
          alt={painter.name}
          loading="lazy"
          className="painting-image"
        />
        <DeleteImage painter={painter} />
      </Card>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ painter, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/image`;
    const imageId = painter.images[index].content.id;
    const params = { id: painter.id, image_id: imageId };

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

  if (currentUser && painter.id) {
    return (
      <Grid item xs={12}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          Edit Painter
        </Button>
        <EditDialog
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </Grid>
    );
  }
  return "";
};

export default Biography;
