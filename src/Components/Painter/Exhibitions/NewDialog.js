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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { DesktopDatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";
import { parseImages, parseGeneralParams } from "../../../utils/helpers";
import Toast from "../../../utils/toast";

const NewDialog = function NewDialog({
  exhibition,
  painter,
  open,
  handleClose,
}) {
  const [title, setTitle] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [rankdate, setRankdate] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [which, setWhich] = useState("");
  const [link, setLink] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const required = false;
  let formTitle = "";
  let submitButton = "";

  if (exhibition) {
    formTitle = "Edit Exhibition";
    submitButton = "Update";
  } else {
    formTitle = "Create Exhibition";
    submitButton = "Create";
  }

  // If Editing
  useEffect(() => {
    if (exhibition) {
      Object.keys(exhibition).forEach((key) => {
        if (!exhibition[key] && key !== "rankdate") {
          exhibition[key] = "";
        }
      });

      if (exhibition.rankdate) {
        setRankdate(exhibition.rankdate);
      }

      if (exhibition.description) {
        const object = JSON.parse(exhibition.description);
        const raw = convertFromRaw(object);
        const editorState = EditorState.createWithContent(raw);
        setDescription(editorState);
      }

      setPagelink(exhibition.pagelink);
      setTitle(exhibition.title);
      setPagelink(exhibition.pagelink);
      setStartDate(exhibition.start_date);
      setEndDate(exhibition.end_date);
      setWhich(exhibition.which);
      setLink(exhibition.link);
      setOrganization(exhibition.organization);
      setLocation(exhibition.location);
    }
  }, [exhibition]);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleExhibitionResponse = (data) => {
    Toast({ message: data.message, type: "success" });
    // Update exhibitions with images
    if (data.success && images.length > 0) {
      const { id } = data.exhibition;
      const params = parseImages(id, images);
      const path = `/${painter.id}/exhibitions/${id}/images`;

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
      rankdate,
      start_date: startDate,
      end_date: endDate,
      which,
      link,
      organization,
      location,
      description: stringDescription,
      painter,
    };

    const params = parseGeneralParams(data);
    if (exhibition) {
      const path = `/${painter.id}/exhibitions/${exhibition.id}`;
      putResource(path, params, handleExhibitionResponse);
    } else {
      const path = `/${painter.id}/exhibitions`;
      postResource(path, params, handleExhibitionResponse);
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
        <form className="new-exhibition-form" onSubmit={handleSubmit}>
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

            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel id="exhibition-type-select-label">Type</InputLabel>
                <Select
                  labelId="exhibition-type-select-label"
                  id="exhibition-type-select"
                  value={which}
                  label="Type"
                  onChange={(e) => setWhich(e.target.value)}
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="solo">Solo</MenuItem>
                  <MenuItem value="group">Group</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  fullWidth
                  label="Rank Date"
                  inputFormat="dd/MM/yyyy"
                  value={rankdate}
                  onChange={(e) => setRankdate(e)}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Start Date"
                variant="outlined"
                name="start_date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="End Date"
                variant="outlined"
                name="end_date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Grid>

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
