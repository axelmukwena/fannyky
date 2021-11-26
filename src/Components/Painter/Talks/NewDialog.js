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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";
import { parseImages, parseGeneralParams } from "../../../utils/helpers";

const NewDialog = function NewDialog({ talk, painter, open, handleClose }) {
  const [title, setTitle] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const required = false;
  let formTitle = "";
  let submitButton = "";

  if (talk) {
    formTitle = "Edit Talk";
    submitButton = "Update";
  } else {
    formTitle = "Create Talk";
    submitButton = "Create";
  }

  // If Editing
  useEffect(() => {
    if (talk) {
      Object.keys(talk).forEach((key) => {
        if (!talk[key]) {
          talk[key] = "";
        }
      });

      if (talk.description) {
        const object = JSON.parse(talk.description);
        const raw = convertFromRaw(object);
        const editorState = EditorState.createWithContent(raw);
        setDescription(editorState);
      }

      setTitle(talk.title);
      setPagelink(talk.pagelink);
      setDate(talk.date);
      setLink(talk.link);
      setOrganizer(talk.organizer);
      setLocation(talk.location);
    }
  }, [talk]);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleTalkResponse = (data) => {
    console.log("Response", data);
    // Update talks with images
    if (data.success && images.length > 0) {
      const { id } = data.talk;
      const params = parseImages(id, images);
      const path = `/${painter.id}/talks/${id}/images`;

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
      date,
      link,
      organizer,
      location,
      description: stringDescription,
      painter,
    };

    const params = parseGeneralParams(data);
    if (talk) {
      const path = `/${painter.id}/talks/${talk.id}`;
      putResource(path, params, handleTalkResponse);
    } else {
      const path = `/${painter.id}/talks`;
      postResource(path, params, handleTalkResponse);
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
        <form className="new-talk-form" onSubmit={handleSubmit}>
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

            <Grid item xs={8}>
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

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Date"
                variant="outlined"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
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

            <Grid item xs={6} md={7}>
              <TextField
                fullWidth
                label="Organizer"
                variant="outlined"
                name="organizer"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
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
              <TextField
                fullWidth
                label="External Link"
                variant="outlined"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
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

export default NewDialog;
