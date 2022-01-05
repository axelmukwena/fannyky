import React, { useState } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { DeleteOutline, Email, Link, Phone } from "@mui/icons-material";
import EditDialog from "./EditDialog";
import { postResource } from "../../../utils/requests";
import Toast from "../../../utils/toast";
import Loading from "../../Loading/Loading";

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

  if (!painter) {
    return <Loading />;
  }

  let sm = 12;
  if (painter) {
    if (painter.images.length > 0) {
      sm = 9;
    }

    // Create html markup for about section
    let about = convertContentToHTML(painter.about);
    if (about) {
      about = about.replace("###", "<br>");
    }
    about = createMarkup(about);

    return (
      <Grid container spacing={2}>
        <IsLoggedIn />

        <Grid item xs={12}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              fontFamily: "Roboto",
            }}
            className="page-title"
          >
            Biography
          </Typography>
        </Grid>

        {(painter.email || painter.phone || painter.link) && (
          <Grid item xs={12}>
            <hr className="horizontal" />
          </Grid>
        )}

        {painter.email && (
          <Grid
            item
            style={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Email style={{ fontSize: 19, marginRight: 7 }} />
            <Typography>{painter.email}</Typography>
          </Grid>
        )}

        {painter.phone && (
          <Grid
            item
            style={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
          >
            |&nbsp;&nbsp;&nbsp;
            <Phone style={{ fontSize: 19, marginRight: 7 }} />
            <Typography>{painter.phone}</Typography>
          </Grid>
        )}

        {painter.link && (
          <Grid
            item
            style={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
          >
            |&nbsp;&nbsp;&nbsp;
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link style={{ fontSize: 19, marginRight: 7 }} />
            <a
              href={painter.link}
              target="_blank"
              className="text-color"
              rel="noreferrer"
            >
              <Typography>Professional Profile</Typography>
            </a>
          </Grid>
        )}

        <Grid item xs={12}>
          <hr className="horizontal" style={{ margin: "0" }} />
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          sx={{ marginTop: "0" }}
          spacing={5}
        >
          <GetImage painter={painter} />

          <Grid item xs={12} sm={sm}>
            <Typography className="justify" dangerouslySetInnerHTML={about} />
          </Grid>
        </Grid>
      </Grid>
    );
  }
};

const GetImage = function GetImage({ painter }) {
  if (painter.id && painter.images.length > 0) {
    const image = painter.images[0];
    return (
      <Grid item xs={8} sm={3}>
        <Card
          id={image.url}
          elevation={0}
          style={{
            padding: 0,
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
            style={{ borderRadius: "100%" }}
          />
          <DeleteImage painter={painter} index={0} />
        </Card>
      </Grid>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ painter, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
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
