import React, { useState } from "react";
import { CardMedia, Typography, Button, Card, Grid } from "@mui/material";
import { DeleteOutline, Link } from "@mui/icons-material";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import ImagesDialog from "../ImagesDialog";
import { deleteResource, postResource } from "../../../utilities/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";
import Toast from "../../../utilities/toast";
import useUser from "../../../api/useUser";
import { imageUrl } from "../../../utilities/helpers";

const Show = function Show({ talk }) {
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

  if (talk) {
    let description = convertContentToHTML(talk.description);
    description = createMarkup(description);

    return (
      <div style={{ marginTop: "15px" }}>
        <IsLoggedIn talk={talk} />
        <Grid container spacing={2}>
          <GetImages talk={talk} />

          <Grid item xs={12} sm={talk.images.length > 0 ? 6 : 12}>
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {talk.title}
            </Typography>

            <CustomHorizontal />

            <Typography>By {talk.painter.name}</Typography>

            {talk.date && <Typography>Date: {talk.date}</Typography>}

            <FormatLink talk={talk} />

            <CustomHorizontal />

            {(talk.organizer || talk.location) && (
              <Typography>
                {talk.organizer} {talk.location}
              </Typography>
            )}

            <Typography
              className="justify"
              style={{ marginTop: 20 }}
              dangerouslySetInnerHTML={description}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  return "";
};

const GetImages = function GetImages({ talk }) {
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

  const { images } = talk;

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
            id={image.medium}
            elevation={0}
            style={{
              padding: 0,
              margin: "20px 20px 20px 20px",
              position: "relative",
              borderRadius: 0,
            }}
          >
            <CardMedia
              src={imageUrl(image.medium)}
              alt={talk.title}
              component="img"
              onClick={() => handleOpen(index)}
              style={{
                cursor: "pointer",
              }}
            />
            <DeleteImage talk={talk} index={index} />
          </Card>
        ))}
      </div>
      <ImagesDialog
        resource={talk}
        current={current}
        setCurrent={setCurrent}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

const FormatLink = function FormatLink({ talk }) {
  if (talk.link) {
    return (
      <a
        style={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          color: "#787878",
        }}
        href={talk.link}
        target="_blank"
        rel="noreferrer"
      >
        <Typography>External Link</Typography>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <Link style={{ fontSize: 19, marginLeft: 7 }} />
      </a>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ talk, index }) {
  const { user } = useUser();
  const { painter } = talk;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/talks/${talk.id}/image`;
    const imageId = talk.images[index].content.id;
    const params = { id: talk.id, image_id: imageId, painter };

    postResource(path, params, handleImagesResponse);
  };

  if (user && painter) {
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

const IsLoggedIn = function IsLoggedIn({ talk }) {
  const { user } = useUser();
  const { painter } = talk;

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

  const handleDeleteTalk = () => {
    const path = `/${painter.id}/talks/${talk.id}`;

    deleteResource(`${path}`, handleDeleleResponse);
  };

  if (user && painter) {
    return (
      <div>
        <div className="row" style={{ marginTop: 25, marginLeft: 25 }}>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleOpenNew()}
          >
            Edit Talk
          </Button>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleDeleteTalk()}
          >
            Delete Talk
          </Button>
          <NewDialog
            talk={talk}
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
