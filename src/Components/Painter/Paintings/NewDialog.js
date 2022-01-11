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

const NewDialog = function NewDialog({ painting, painter, open, handleClose }) {
  const [title, setTitle] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [rankdate, setRankdate] = useState(null);
  const [dimension, setDimension] = useState("");
  const [abstract, setAbstract] = useState("");
  const [groupType, setGroupType] = useState("");
  const [description, setDescription] = useState(() =>
    EditorState.createEmpty()
  );
  const [images, setImages] = useState([]);
  const [required, setRequired] = useState(true);
  let formTitle = "";
  let submitButton = "";

  if (painting) {
    formTitle = "Edit Painting";
    submitButton = "Update";
  } else {
    formTitle = "Create Painting";
    submitButton = "Create";
  }

  // If Editing
  useEffect(() => {
    if (painting) {
      Object.keys(painting).forEach((key) => {
        if (!painting[key] && key !== "rankdate") {
          painting[key] = "";
        }
      });

      if (painting.rankdate) {
        setRankdate(painting.rankdate);
      }

      if (painting.description) {
        const object = JSON.parse(painting.description);
        const raw = convertFromRaw(object);
        const editorState = EditorState.createWithContent(raw);
        setDescription(editorState);
      }

      setPagelink(painting.pagelink);
      setTitle(painting.title);
      setDateCreated(painting.date_created);
      setDimension(painting.dimension);
      setAbstract(painting.abstract);
      setGroupType(painting.group_type);
    }

    if (painting && painting.images.length > 0) {
      setRequired(false);
    }
  }, [painting]);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
    handleClose();
  };

  const handlePaintingResponse = (data) => {
    Toast({ message: data.message, type: "success" });
    // Update paintings with images
    if (data.success && images.length > 0) {
      const { id } = data.painting;
      const params = parseImages(id, images);
      const path = `/${painter.id}/paintings/${id}/images`;

      postResource(path, params, handleImagesResponse);
    } else {
      handleClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawDescription = convertToRaw(description.getCurrentContent());
    const stringDescription = JSON.stringify(rawDescription);

    const data = {
      title,
      date_created: dateCreated,
      pagelink,
      rankdate,
      dimension,
      abstract,
      group_type: groupType,
      description: stringDescription,
      painter,
    };

    const params = parseGeneralParams(data);
    if (painting) {
      const path = `/${painter.id}/paintings/${painting.id}`;
      putResource(path, params, handlePaintingResponse);
    } else {
      const path = `/${painter.id}/paintings`;
      postResource(path, params, handlePaintingResponse);
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

            <Grid item xs={8}>
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

            <Grid item xs={6} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Rank Date"
                  inputFormat="dd/MM/yyyy"
                  value={rankdate}
                  onChange={(e) => setRankdate(e)}
                  renderInput={(params) => <TextField required {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={5}>
              <TextField
                fullWidth
                label="Date Created"
                variant="outlined"
                name="date_created"
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />
            </Grid>

            <Grid item xs={7}>
              <TextField
                fullWidth
                label="Dimensions"
                variant="outlined"
                name="dimension"
                value={dimension}
                onChange={(e) => setDimension(e.target.value)}
              />
            </Grid>

            <Grid item xs={painter.rank === 1 ? 8 : 12}>
              <TextField
                fullWidth
                label="Abstract"
                variant="outlined"
                name="abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </Grid>

            {/* If painter is Buda, add painter types for grouping */}
            {/* Fanny uses date grouping */}
            {painter.rank === 1 ? (
              <Grid item xs={4}>
                <FormControl fullWidth required>
                  <InputLabel id="group-type">Group Type</InputLabel>
                  <Select
                    labelId="group-type"
                    id="group-type-select"
                    value={groupType}
                    label="Group Type"
                    onChange={(e) => setGroupType(e.target.value)}
                  >
                    <MenuItem value="Creative Works">Creative Works</MenuItem>
                    <MenuItem value="Landscapes in Japan">
                      Landscapes in Japan
                    </MenuItem>
                    <MenuItem value="Sketches with Themes">
                      Sketches with Themes
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            ) : null}

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
