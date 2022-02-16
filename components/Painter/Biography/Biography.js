import React, { useState } from "react";
import {
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { DeleteOutline } from "@mui/icons-material";
import { postResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import Loading from "../../Loading/Loading";
import NextLink from "../../NextLink";
import EditDialog from "./EditDialog";
import useUser from "../../../api/useUser";

const Biography = function Biography({ painter }) {
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
      <Grid container spacing={2} sx={{ marginTop: "0px" }}>
        <IsLoggedIn painter={painter} />

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

            <NextLink
              href="/[painterSlug]/contact"
              as={`/${painter.slug}/contact`}
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
            </NextLink>
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
            src={image.medium}
            alt={painter.name}
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
  const { user } = useUser();

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/image`;
    const imageId = painter.images[index].content.id;
    const params = { id: painter.id, image_id: imageId };

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

const IsLoggedIn = function IsLoggedIn({ painter }) {
  const { user } = useUser();
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (user && painter) {
    return (
      <>
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
        {painter.paintings_categories.length > 0 && (
          <Grid item xs={12}>
            <Typography sx={{ width: "fit-content", p: 0.5 }}>
              Artworks Categories
            </Typography>
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0.5,
                m: 0,
              }}
              component="ul"
            >
              {painter.paintings_categories.map((category) => {
                return (
                  <ListItem
                    key={category}
                    sx={{ width: "fit-content", paddingLeft: "0" }}
                  >
                    <Chip icon={null} label={category} />
                  </ListItem>
                );
              })}
            </Paper>
          </Grid>
        )}
      </>
    );
  }
  return "";
};

export default Biography;
