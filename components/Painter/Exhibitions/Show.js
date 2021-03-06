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
import { capitalize, imageUrl } from "../../../utilities/helpers";
import Toast from "../../../utilities/toast";
import useUser from "../../../api/useUser";

const Show = function Show({ exhibition }) {
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

  if (exhibition) {
    let description = convertContentToHTML(exhibition.description);
    description = createMarkup(description);

    return (
      <div style={{}}>
        <IsLoggedIn exhibition={exhibition} />
        <Grid container spacing={2} sx={{ marginTop: "-2px" }}>
          <GetImages exhibition={exhibition} />

          <Grid item xs={12} sm={exhibition.images.length > 0 ? 6 : 12}>
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {exhibition.title}
            </Typography>

            <CustomHorizontal />

            <Typography style={{}}>
              Artist: {exhibition.painter.name}
            </Typography>
            <Capitalize exhibition={exhibition} />
            <Typography style={{}}>
              Date: {exhibition.start_date}
              <EndDate exhibition={exhibition} />
            </Typography>

            <FormatLink exhibition={exhibition} />

            <CustomHorizontal />

            <Typography style={{}}>
              {exhibition.organization} {exhibition.location}
            </Typography>

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

const GetImages = function GetImages({ exhibition }) {
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

  const { images } = exhibition;

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
            key={image.original}
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
              alt={exhibition.title}
              component="img"
              onClick={() => handleOpen(index)}
              style={{
                cursor: "pointer",
              }}
            />
            <DeleteImage exhibition={exhibition} index={index} />
          </Card>
        ))}
      </div>
      <ImagesDialog
        resource={exhibition}
        current={current}
        setCurrent={setCurrent}
        open={open}
        handleClose={handleClose}
      />
    </Grid>
  );
};

const Capitalize = function Capitalize({ exhibition }) {
  if (exhibition.which) {
    return (
      <Typography style={{}}>Type: {capitalize(exhibition.which)}</Typography>
    );
  }
  return null;
};

const FormatLink = function FormatLink({ exhibition }) {
  if (exhibition.link) {
    return (
      <a
        style={{
          width: "fit-content",
          display: "flex",
          alignItems: "center",
          color: "#787878",
        }}
        href={exhibition.link}
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

const EndDate = function EndDate({ exhibition }) {
  if (exhibition.start_date && exhibition.end_date) {
    return ` - ${exhibition.end_date}`;
  }
  return exhibition.end_date;
};

const DeleteImage = function DeleteImage({ exhibition, index }) {
  const { user } = useUser();
  const { painter } = exhibition;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/exhibitions/${exhibition.id}/image`;
    const imageId = exhibition.images[index].content.id;
    const params = { id: exhibition.id, image_id: imageId, painter };

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

const IsLoggedIn = function IsLoggedIn({ exhibition }) {
  const { user } = useUser();
  const { painter } = exhibition;

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

  const handleDeleteExhibition = () => {
    const path = `/${painter.id}/exhibitions/${exhibition.id}`;

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
            Edit Exhibition
          </Button>
          <Button
            style={{ width: 200, height: 40, marginRight: 25 }}
            variant="contained"
            color="primary"
            onClick={() => handleDeleteExhibition()}
          >
            Delete Exhibition
          </Button>
          <NewDialog
            exhibition={exhibition}
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
