import React, { useState } from "react";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
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
      sm = 7;
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

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ margin: "20px 0 0 20px" }}
        >
          <GetImage painter={painter} />

          <Grid item xs={12} sm={sm}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "1rem",
                fontFamily: "Roboto",
                marginBottom: "12px",
              }}
            >
              About {painter.name.split(" ")[0]}
            </Typography>

            {painter.link && (
              <Grid
                item
                style={{
                  width: "fit-content",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "17px",
                }}
              >
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

            <Typography className="justify" dangerouslySetInnerHTML={about} />

            <Link
              to={`/${painter.slug}/contact`}
              replace
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ textTransform: "none", marginTop: "20px", width: "40%" }}
              >
                Get in touch
              </Button>
            </Link>
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
      <Grid item xs={8} sm={4} sx={{ margin: "0 20px 20px 0" }}>
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
            style={{
              borderRadius: "100%",
            }}
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

  if (currentUser && painter) {
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

  if (currentUser && painter) {
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
