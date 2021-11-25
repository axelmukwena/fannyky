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
    setHeight(window.innerHeight - 30);
  };

  const showContent = () => {
    if (show) {
      const card = document.querySelector(".painting-dialog-image");
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
            opacity: 0.8,
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
          style={{
            width: "fit-content",
            right: 0,
            padding: "0 13px",
            position: "absolute",
          }}
        >
          <Button
            style={{ color: "#cfcfcf", backgroundColor: "transparent" }}
            onClick={handleClose}
          >
            <Close />
          </Button>
        </DialogActions>
        <Grid container spacing={0}>
          <Grid item xs onClick={() => goBack(painting.images)}>
            <Button
              style={{
                color: "#cfcfcf",
                backgroundColor: "transparent",
                top: "50%",
                float: "left",
              }}
            >
              <ArrowBackIosIcon />
            </Button>
          </Grid>
          <Grid item xs="auto" style={{ maxWidth: "80%" }}>
            <Card
              onMouseOver={() => showContent()}
              onMouseEnter={() => showContent()}
              onMouseLeave={() => hideContent()}
              elevation={0}
              style={{ padding: 0, borderRadius: 0 }}
            >
              <div className="painting-dialog-image">
                <CardMedia
                  component="img"
                  src={painting.images[current].url}
                  alt={painting.title}
                  height={height}
                />
              </div>
              <PaintingsDialogContent show={show} painting={painting} />
            </Card>
          </Grid>
          <Grid item xs onClick={() => goForward(painting.images)}>
            <Button
              style={{
                color: "#cfcfcf",
                backgroundColor: "transparent",
                top: "50%",
                float: "right",
              }}
            >
              <ArrowForwardIosIcon />
            </Button>
          </Grid>
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

        <Typography
          style={{ marginTop: 10, fontStyle: "italic", fontSize: 14 }}
        >
          {painting.painter.name}
          <DateCreated />
        </Typography>
        <Typography style={{ fontSize: 14 }}>{painting.abstract}</Typography>
        <Typography style={{ fontSize: 14 }}>{painting.dimension}</Typography>

        <hr className="horizontal" />

        <Typography style={{ marginTop: 5, fontSize: 14 }}>
          {painting.description}
        </Typography>
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

export default ImageDialog;
