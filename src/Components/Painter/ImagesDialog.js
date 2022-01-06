/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import CustomHorizontal from "./CustomHorizontal";

const ImageDialog = function ImageDialog({
  resource,
  current,
  setCurrent,
  open,
  handleClose,
  show,
}) {
  const [height, setHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [width, setWidth] = useState("fit-content");
  const [justifyContent, setJustifyContent] = useState("center");

  // On screen width changes
  const handleResize = () => {
    setHeight(window.innerHeight - 34);

    if (window.innerWidth > 600) {
      setJustifyContent("space-between");
      setWidth("fit-content");
      setMaxHeight("100%");
    } else {
      setJustifyContent("center");
      setWidth(`${window.innerWidth - 30}px`);
      setMaxHeight(`${window.innerWidth - 30}px`);
    }

    if (resource && resource.images.length <= 1) {
      setJustifyContent("center");
    }
  };

  const showContent = () => {
    if (show) {
      const card = document.querySelector(".dialog-image");
      const cardWidth = getComputedStyle(card).width;
      const content = document.querySelector(".painting-dialog-content");
      content.style.width = cardWidth;
      content.style.display = "block";
    }
  };

  const hideContent = () => {
    if (show) {
      const content = document.querySelector(".painting-dialog-content");
      content.style.display = "none";
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function goBack(images) {
    if (current > 0) {
      setCurrent(current - 1);
    } else if (current === 0) {
      setCurrent(images.length - 1);
    }
  }

  function goForward(images) {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    } else if (current === images.length - 1) {
      setCurrent(0);
    }
  }

  // console.log(painting);
  if (resource && resource.images.length > 0) {
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            opacity: 0.94,
            backgroundColor: "white",
          },
        }}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            borderRadius: 0,
            boxShadow: "none",
            margin: 0,
          },
        }}
      >
        <DialogActions
          sx={{
            width: "fit-content",
            right: 0,
            padding: "0 13px",
            position: "absolute",
            zIndex: 100,
          }}
        >
          <Button
            sx={{ color: "#cfcfcf", backgroundColor: "transparent" }}
            onClick={handleClose}
          >
            <Close />
          </Button>
        </DialogActions>
        <Grid
          container
          direction="row"
          justifyContent={justifyContent}
          alignItems="center"
          spacing={0}
          sx={{ height: "100%" }}
        >
          {resource.images.length > 1 && (
            <Grid xs="auto" item sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                onClick={() => goBack(resource.images)}
                sx={{
                  color: "#a1a1a1",
                  backgroundColor: "transparent",
                  float: "left",
                }}
              >
                <ArrowBackIosIcon />
              </Button>
            </Grid>
          )}
          <Grid item sx={{ maxWidth: "100%", alignSelf: "center" }}>
            <Card
              onMouseOver={() => showContent()}
              onMouseEnter={() => showContent()}
              onMouseLeave={() => hideContent()}
              elevation={0}
              sx={{ padding: 0, borderRadius: 0 }}
            >
              <div className="dialog-image">
                <CardMedia
                  component="img"
                  src={resource.images[current].url}
                  alt={resource.title}
                  height={height}
                  sx={{ width, maxHeight }}
                />
              </div>
              <PaintingsDialogContent show={show} resource={resource} />
            </Card>
          </Grid>
          {resource.images.length > 1 && (
            <Grid xs="auto" item sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                onClick={() => goForward(resource.images)}
                sx={{
                  color: "#a1a1a1",
                  backgroundColor: "transparent",
                  float: "right",
                }}
              >
                <ArrowForwardIosIcon />
              </Button>
            </Grid>
          )}
        </Grid>
      </Dialog>
    );
  }
  return "";
};

const PaintingsDialogContent = function PaintingsDialogContent({
  show,
  resource,
}) {
  if (show) {
    return (
      <div className="painting-dialog-content">
        <Link
          to={`${resource.painter.slug}/works/${resource.slug}`}
          className="painting-title-popup"
          replace
        >
          {resource.title}
        </Link>

        <Typography
          sx={{ marginTop: "10px", fontSize: "0.975rem", color: "#525252" }}
        >
          By {resource.painter.name}
          <DateCreated />
        </Typography>
        {resource.abstract && (
          <Typography sx={{ fontSize: "0.975rem", color: "#525252" }}>
            Media: {resource.abstract}
          </Typography>
        )}

        {resource.dimension && (
          <Typography sx={{ fontSize: "0.975rem", color: "#525252" }}>
            Dimensions: {resource.dimension}
          </Typography>
        )}

        <GetDescription painting={resource} />
      </div>
    );
  }
  return "";
};

const DateCreated = function DateCreated({ painting }) {
  if (painting && painting.date_created) {
    return `, ${painting.date_created.split("-")[0]}`;
  }
  return "";
};

const GetDescription = function GetDescription({ painting }) {
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
  let description = convertContentToHTML(painting.description);
  const tempDes = description.replace("<p></p>", "");
  if (tempDes) {
    description = createMarkup(description);
    return (
      <div>
        <CustomHorizontal />

        <Typography
          className="justify"
          sx={{ marginTop: 5, fontSize: 14 }}
          dangerouslySetInnerHTML={description}
        />
      </div>
    );
  }
  return null;
};

export default ImageDialog;
