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
import CustomHorizontal from "../CustomHorizontal";

const ImageDialog = function ImageDialog({
  painting,
  current,
  setCurrent,
  open,
  handleClose,
  show,
}) {
  const [height, setHeight] = useState(0);

  // On screen width changes
  const handleResize = () => {
    setHeight(window.innerHeight - 34);
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
  if (painting && painting.images.length > 0) {
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
          justifyContent={
            painting.images.length > 1 ? "space-between" : "center"
          }
          alignItems="center"
          spacing={0}
          sx={{ height: "100%" }}
        >
          {painting.images.length > 1 && (
            <Grid xs="auto" item sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                onClick={() => goBack(painting.images)}
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
          <Grid item xs={12} sm={10} sx={{ alignSelf: "center" }}>
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
                  src={painting.images[current].url}
                  alt={painting.title}
                  sx={{ maxHeight: height }}
                />
              </div>
              <PaintingsDialogContent show={show} painting={painting} />
            </Card>
          </Grid>
          {painting.images.length > 1 && (
            <Grid xs="auto" item sx={{ display: { xs: "none", sm: "block" } }}>
              <Button
                onClick={() => goForward(painting.images)}
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
  painting,
}) {
  if (show) {
    return (
      <div className="painting-dialog-content">
        <Link
          to={`${painting.painter.slug}/paintings/${painting.slug}`}
          className="painting-title-popup"
        >
          {painting.title}
        </Link>

        <Typography sx={{ marginTop: 10, fontSize: 14, color: "#525252" }}>
          By {painting.painter.name}
          <DateCreated />
        </Typography>
        {painting.abstract && (
          <Typography sx={{ fontSize: 14, color: "#525252" }}>
            Media: {painting.abstract}
          </Typography>
        )}

        {painting.dimension && (
          <Typography sx={{ fontSize: 14, color: "#525252" }}>
            Dimensions: {painting.dimension}
          </Typography>
        )}

        <GetDescription painting={painting} />
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
