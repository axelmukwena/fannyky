import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Button, Card, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline, Link } from "@mui/icons-material";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import ImagesDialog from "./ImagesDialog";
import {
  deleteResource,
  getResource,
  postResource,
} from "../../../utils/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";
import { capitalize } from "../../../utils/helpers";

const Show = function Show({ match }) {
  const { url } = match;
  const [exhibition, setExhibition] = useState({});
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getResource(url, setExhibition);
  }, [url]);

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

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (exhibition.id) {
    let description = convertContentToHTML(exhibition.description);
    description = createMarkup(description);
    const { images } = exhibition;
    let width = "45%";
    let padding = "16px 0 0 16px";
    if (images.length === 0) {
      width = "70%";
      padding = "0";
    }
    return (
      <div style={{}}>
        <IsLoggedIn exhibition={exhibition} />
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
                    alt={exhibition.title}
                    loading="lazy"
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
              exhibition={exhibition}
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
                {exhibition.title}
              </Typography>

              <CustomHorizontal />

              <Typography style={{}}>
                Artist: {exhibition.painter.name}
              </Typography>
              <Typography style={{}}>
                Type: {capitalize(exhibition.which)}
              </Typography>
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
                style={{ marginTop: 20 }}
                dangerouslySetInnerHTML={description}
              />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
  return "";
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
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/exhibitions/${exhibition.id}/image`;
    const imageId = exhibition.images[index].content.id;
    const params = { id: exhibition.id, image_id: imageId, painter };

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

const IsLoggedIn = function IsLoggedIn({ exhibition }) {
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

  const handleDeleteExhibition = () => {
    const path = `/${painter.id}/exhibitions/${exhibition.id}`;

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
