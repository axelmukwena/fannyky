/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import {
  Box,
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
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import CustomHorizontal from "./CustomHorizontal";
import NextLink from "../NextLink";

const ImageDialog = function ImageDialog({
  resource,
  current,
  setCurrent,
  open,
  handleClose,
  show,
}) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [showOnMobile, setShowOnMobile] = useState("block");

  // On screen width changes
  const handleResize = () => {
    setHeight(window.innerHeight - 34);
    setWidth(window.innerWidth);
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

  const toggleMobile = () => {
    if (width > 600) return;

    if (showOnMobile === "none") {
      setShowOnMobile("block");
    } else {
      setShowOnMobile("none");
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

  const goBack = (images) => {
    if (current > 0) {
      setCurrent(current - 1);
    } else if (current === 0) {
      setCurrent(images.length - 1);
    }
  };

  const goForward = (images) => {
    if (current < images.length - 1) {
      setCurrent(current + 1);
    } else if (current === images.length - 1) {
      setCurrent(0);
    }
  };

  if (resource && resource.images.length > 0) {
    let justifyContent = "center";
    if (width > 900 && !(resource.images.length === 1)) {
      justifyContent = "space-between";
    }

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        BackdropProps={{
          style: {
            opacity: 0.94,
            backgroundColor: "#e9e9e9",
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
              sx={{
                padding: 0,
                borderRadius: 0,
                position: width > 600 ? "static" : "relative",
              }}
            >
              <div className="dialog-image">
                {width <= 900 && (
                  <CardMedia
                    component="img"
                    src={resource.images[current].large}
                    alt={resource.title}
                    onTouchStart={() => toggleMobile()}
                    sx={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
                {width > 900 && (
                  <CardMedia
                    component="img"
                    src={resource.images[current].original}
                    alt={resource.title}
                    onTouchStart={() => toggleMobile()}
                    sx={{
                      width: "fit-content",
                      height,
                    }}
                  />
                )}
              </div>
              <BackForwardButtonsMobile
                resource={resource}
                goBack={goBack}
                goForward={goForward}
                showOnMobile={showOnMobile}
              />
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

const BackForwardButtonsMobile = function BackForwardButtonsMobile({
  resource,
  goBack,
  goForward,
  showOnMobile,
}) {
  if (resource.images.length > 1) {
    return (
      <>
        <Grid
          xs="auto"
          item
          sx={{
            display: { xs: showOnMobile, sm: "none" },
            position: "absolute",
            top: "45%",
            left: "0",
            zIndex: 100,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => goBack(resource.images)}
            sx={{
              borderRadius: 0,
            }}
          >
            <ArrowBackIosIcon />
          </Button>
        </Grid>

        <Grid
          xs="auto"
          item
          sx={{
            display: { xs: showOnMobile, sm: "none" },
            position: "absolute",
            top: "45%",
            right: "0",
            zIndex: 100,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => goForward(resource.images)}
            sx={{
              borderRadius: 0,
            }}
          >
            <ArrowForwardIosIcon />
          </Button>
        </Grid>
      </>
    );
  }
  return null;
};

const PaintingsDialogContent = function PaintingsDialogContent({
  show,
  resource,
}) {
  if (show) {
    return (
      <Box className="painting-dialog-content" sx={{ width: "fit-content" }}>
        <NextLink
          href="[painterSlug]/works/[workSlug]"
          as={`${resource.painter.slug}/works/${resource.slug}`}
          className="painting-title-popup"
          style={{ fontWeight: 500 }}
        >
          {resource.title}
        </NextLink>

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
      </Box>
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
          className="justify description"
          sx={{ marginTop: "5px", fontSize: "14px" }}
          dangerouslySetInnerHTML={description}
        />
      </div>
    );
  }
  return null;
};

export default ImageDialog;
