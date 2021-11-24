/* eslint-disable react/jsx-props-no-spreading */
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import React, { useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { postResource } from "../../../../utils/requests";
import UploadImages from "./UploadImages";
import {
  parsePaintingImages,
  parsePaintingParams,
} from "../../../../utils/helpers";

const NewDialog = function NewDialog({ painter, open, handleClose }) {
  const [title, setTitle] = useState("");
  const [dateCreated, setDateCreated] = useState(null);
  const [dimension, setDimension] = useState("");
  const [abstract, setAbstract] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const { path } = useRouteMatch();

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handlePaintingResponse = (data) => {
    console.log("Response", data);
    // Update paintings with images
    const { id } = data.painting;
    const params = parsePaintingImages(id, images);
    console.log(Array.from(params.entries()));
    postResource(
      `${path}/paintings/${id}/images`,
      params,
      handleImagesResponse
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      title,
      dateCreated,
      dimension,
      abstract,
      description,
      painter,
    };

    const params = parsePaintingParams(data);
    // const params = { title, painter };

    // console.log(Array.from(params.entries()));
    // console.log(images);
    postResource(`${path}/paintings`, params, handlePaintingResponse);
    // console.log(handleResponse, path);
  };

  return (
    <Dialog maxWidth="sm" open={open} scroll="body">
      <DialogActions
        style={{
          width: "fit-content",
          right: 0,
          padding: "0 13px",
          position: "absolute",
        }}
      >
        <Button style={{ color: "gray" }} onClick={handleClose}>
          <Close />
        </Button>
      </DialogActions>

      <DialogContent>
        <form className="new-painting-form" onSubmit={handleSubmit}>
          <Grid
            justifyContent="flex-start"
            alignItems="center"
            container
            spacing={2}
          >
            <Grid item xs={6} md={8}>
              <DialogTitle
                style={{
                  padding: 0,
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  fontFamily: "Roboto",
                  flex: 1,
                  color: "#787878",
                }}
              >
                Add new Painting
              </DialogTitle>
            </Grid>
            <Grid item xs={6} md={8}>
              <TextField
                fullWidth
                autoFocus
                label="Title"
                variant="outlined"
                name="title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date Created"
                  inputFormat="dd/MM/yyyy"
                  value={dateCreated}
                  onChange={(e) => setDateCreated(e)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Dimensions"
                variant="outlined"
                name="dimension"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={8}>
              <TextField
                fullWidth
                label="Abstract"
                variant="outlined"
                name="abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                multiline
                minRows={4}
                fullWidth
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <UploadImages files={images} setFiles={setImages} />
            </Grid>

            <Grid item xs>
              <Button
                fullWidth
                style={{ height: 45 }}
                variant="outlined"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                disableElevation
                style={{ width: "100%", height: 45 }}
                type="submit"
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewDialog;
