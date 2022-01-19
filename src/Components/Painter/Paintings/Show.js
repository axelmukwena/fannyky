import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import ImagesDialog from "../ImagesDialog";
import {
  deleteResource,
  getResource,
  postResource,
} from "../../../utils/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";
import Toast from "../../../utils/toast";
import Loading from "../../Loading/Loading";

const Show = function Show({ match }) {
  const { url } = match;
  const [painting, setPainting] = useState(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  // const painter = useSelector((state) => state.currentPainter.painter);

  useEffect(() => {
    const path = url.replace("works", "paintings");
    getResource(path, setPainting);
  }, [url]);

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!painting) {
    return <Loading />;
  }

  if (painting) {
    const { images } = painting;
    return (
      <>
        <IsLoggedIn painting={painting} />
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={3}
              sx={{
                justifyContent: "center",
                "@media (min-width: 600px)": {
                  justifyContent: "flex-start",
                },
              }}
            >
              {images.map((image, index) => (
                <Grid
                  key={image.url}
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    margin: "0 20px 20px 0",
                    position: "relative",
                    "@media (max-width: 600px)": {
                      margin: "20px 0",
                    },
                  }}
                >
                  <CardMedia
                    elevation={0}
                    id={image.url}
                    src={`${image.url}?w=700&h=700&fit=crop&auto=format`}
                    alt={painting.title}
                    loading="lazy"
                    component="img"
                    onClick={() => handleOpen(index)}
                    sx={{
                      cursor: "pointer",
                      width: "260px",
                      height: "260px",
                      position: "relative",
                      borderRadius: 0,
                      "@media (max-width: 600px)": {
                        width: "100%",
                        height: "100%",
                      },
                    }}
                  />
                  <DeleteImage painting={painting} index={index} />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                fontWeight: 900,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
                flex: 1,
              }}
            >
              {painting.title}
            </Typography>

            <Typography>By {painting.painter.name}</Typography>

            <CustomHorizontal />

            {painting.date_created && (
              <Typography sx={{ marginBottom: "5px" }}>
                Created {painting.date_created.split("-")[0]}
              </Typography>
            )}

            {painting.abstract && (
              <Typography>
                <span style={{ fontWeight: 500 }}>Media: </span>
                {painting.abstract}
              </Typography>
            )}

            {painting.dimension && (
              <Typography>
                <span style={{ fontWeight: 500 }}>Dimensions: </span>
                {painting.dimension}
              </Typography>
            )}

            {painting.category && (
              <Typography>
                <span style={{ fontWeight: 500 }}>Category: </span>
                {painting.category}
              </Typography>
            )}

            <GetDescription painting={painting} />
          </Grid>
        </Grid>
        <ImagesDialog
          resource={painting}
          current={current}
          setCurrent={setCurrent}
          open={open}
          handleClose={handleClose}
          show={false}
        />
      </>
    );
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
          sx={{ marginTop: "20px" }}
          dangerouslySetInnerHTML={description}
        />
      </div>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ painting, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/paintings/${painting.id}/image`;
    const imageId = painting.images[index].content.id;
    const params = { id: painting.id, image_id: imageId, painter };

    postResource(path, params, handleImagesResponse);
  };

  if (currentUser && painter) {
    return (
      <DeleteOutline
        onClick={() => handleDeleteImage()}
        style={{
          position: "absolute",
          top: 35,
          right: 10,
          padding: 0,
          cursor: "pointer",
          color: "black",
          fontSize: 21,
          backgroundColor: "#8989892e",
          borderRadius: "2px",
        }}
      />
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn({ painting }) {
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
    Toast({ message: data.message, type: "success" });
  };

  const handleDeletePainting = () => {
    const path = `/${painter.id}/paintings/${painting.id}`;

    deleteResource(`${path}`, handleDeleleResponse);
  };

  if (currentUser && painter) {
    return (
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleOpenNew()}
          >
            Edit Painting
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleDeletePainting()}
          >
            Delete Painting
          </Button>
        </Grid>
        <NewDialog
          painting={painting}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </Grid>
    );
  }
  return "";
};

export default Show;
