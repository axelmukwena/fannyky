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

const Show = function Show({ publication }) {
  if (publication) {
    return (
      <>
        <IsLoggedIn publication={publication} />

        <Grid container spacing={2} sx={{ marginTop: "-2px" }}>
          <GetImages publication={publication} />

          <Grid item xs={12} sm={publication.images.length > 0 ? 6 : 12}>
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {publication.title}
            </Typography>

            <Typography>By {publication.painter.name}</Typography>

            <CustomHorizontal />

            <Typography>
              {publication.organization}, {publication.location}
            </Typography>

            <FormatLink publication={publication} />

            {publication.year && (
              <Typography>Published: {publication.year}</Typography>
            )}

            <GetDescription publication={publication} />
          </Grid>
        </Grid>
      </>
    );
  }
  return "";
};

const GetImages = function GetImages({ publication }) {
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

  const { images } = publication;

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
      {images.map((image, index) => (
        <Card
          key={image.large}
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
            alt={publication.title}
            component="img"
            onClick={() => handleOpen(index)}
            style={{
              cursor: "pointer",
            }}
          />
          <DeleteImage publication={publication} index={index} />
        </Card>
      ))}
      <ImagesDialog
        resource={publication}
        current={current}
        setCurrent={setCurrent}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

const GetDescription = function GetDescription({ publication }) {
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
  let description = convertContentToHTML(publication.description);
  const tempDes = description.replace("<p></p>", "");
  if (tempDes) {
    description = createMarkup(description);
    return (
      <div>
        <CustomHorizontal />

        <Typography
          className="justify"
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={description}
        />
      </div>
    );
  }
  return null;
};

const FormatLink = function FormatLink({ publication }) {
  if (publication.link) {
    return (
      <a
        style={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          color: "#787878",
        }}
        href={publication.link}
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

const DeleteImage = function DeleteImage({ publication, index }) {
  const { user } = useUser();
  const { painter } = publication;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/publications/${publication.id}/image`;
    const imageId = publication.images[index].content.id;
    const params = { id: publication.id, image_id: imageId, painter };

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

const IsLoggedIn = function IsLoggedIn({ publication }) {
  const { user } = useUser();
  const { painter } = publication;

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

  const handleDeletePublication = () => {
    const path = `/${painter.id}/publications/${publication.id}`;

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
            Edit Publication
          </Button>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleDeletePublication()}
          >
            Delete Publication
          </Button>
          <NewDialog
            publication={publication}
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
