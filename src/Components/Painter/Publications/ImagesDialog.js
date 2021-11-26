/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  Grid,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ImageDialog = function ImageDialog({
  publication,
  current,
  setCurrent,
  open,
  handleClose,
}) {
  const [height, setHeight] = useState(0);

  // On screen width changes
  const handleResize = () => {
    setHeight(window.innerHeight - 30);
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

  // console.log(publication);
  if (publication && publication.images.length > 0) {
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
          <Grid
            item
            xs
            style={{ cursor: "pointer" }}
            onClick={() => goBack(publication.images)}
          >
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
            <Card elevation={0} style={{ padding: 0, borderRadius: 0 }}>
              <div className="dialog-image">
                <CardMedia
                  component="img"
                  src={publication.images[current].url}
                  alt={publication.title}
                  height={height}
                />
              </div>
            </Card>
          </Grid>
          <Grid
            item
            xs
            style={{ cursor: "pointer" }}
            onClick={() => goForward(publication.images)}
          >
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

export default ImageDialog;
