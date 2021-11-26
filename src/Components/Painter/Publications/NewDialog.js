/* eslint-disable react/jsx-props-no-spreading */
import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";
import { parseImages, parseGeneralParams } from "../../../utils/helpers";

const NewDialog = function NewDialog({
  publication,
  painter,
  open,
  handleClose,
}) {
  const [title, setTitle] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [year, setYear] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const required = false;
  let formTitle = "";
  let submitButton = "";

  if (publication) {
    formTitle = "Edit Publication";
    submitButton = "Update";
  } else {
    formTitle = "Create Publication";
    submitButton = "Create";
  }

  // If Editing
  useEffect(() => {
    if (publication) {
      Object.keys(publication).forEach((key) => {
        if (!publication[key]) {
          publication[key] = "";
        }
      });

      if (publication.description) {
        const object = JSON.parse(publication.description);
        const raw = convertFromRaw(object);
        const editorState = EditorState.createWithContent(raw);
        setDescription(editorState);
      }

      setTitle(publication.title);
      setPagelink(publication.pagelink);
      setYear(publication.year);
      setOrganization(publication.organization);
      setLocation(publication.location);
    }
  }, [publication]);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handlePublicationResponse = (data) => {
    console.log("Response", data);
    // Update publications with images
    if (data.success && images.length > 0) {
      const { id } = data.publication;
      const params = parseImages(id, images);
      const path = `/${painter.id}/publications/${id}/images`;

      postResource(path, params, handleImagesResponse);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawDescription = convertToRaw(description.getCurrentContent());
    const stringDescription = JSON.stringify(rawDescription);

    const data = {
      title,
      pagelink,
      year,
      organization,
      location,
      description: stringDescription,
      painter,
    };

    const params = parseGeneralParams(data);
    if (publication) {
      const path = `/${painter.id}/publications/${publication.id}`;
      putResource(path, params, handlePublicationResponse);
    } else {
      const path = `/${painter.id}/publications`;
      postResource(path, params, handlePublicationResponse);
    }
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

      <DialogContent style={{ paddingTop: 30 }}>
        <form className="new-publication-form" onSubmit={handleSubmit}>
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
                {formTitle}
              </DialogTitle>
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={6} md={8}>
              <TextField
                fullWidth
                label="Page Link"
                variant="outlined"
                name="pagelink"
                value={pagelink}
                required
                onChange={(e) => setPagelink(e.target.value)}
              />
            </Grid>

            <PopulateYear year={year} setYear={setYear} />

            <Grid item xs={6} md={7}>
              <TextField
                fullWidth
                label="Organization"
                variant="outlined"
                name="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={5}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ margin: 9, color: "#626262" }}>
                Description
              </Typography>
              <div
                style={{
                  border: "1px solid rgb(185, 185, 185)",
                  borderRadius: 4,
                }}
              >
                <Editor
                  fullWidth
                  editorState={description}
                  onEditorStateChange={setDescription}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <UploadImages
                multiple
                required={required}
                files={images}
                setFiles={setImages}
              />
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
                {submitButton}
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const PopulateYear = function PopulateYear({ year, setYear }) {
  const now = new Date();
  const startYear = now.getFullYear() + 10;
  const years = Array.from(new Array(40), (val, index) => startYear - index);

  return (
    <Grid item xs={6} md={4}>
      <FormControl fullWidth>
        <InputLabel id="publication-year-select-label">Year</InputLabel>
        <Select
          labelId="publication-year-select-label"
          id="publication-year-select"
          value={year}
          label="Year"
          onChange={(e) => setYear(e.target.value)}
        >
          {years.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default NewDialog;
