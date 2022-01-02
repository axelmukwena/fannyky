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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";
import { parseImages, parseGeneralParams } from "../../../utils/helpers";
import Toast from "../../../utils/toast";

const NewDialog = function NewDialog({ award, painter, open, handleClose }) {
  const [prize, setPrize] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const required = false;
  let formTitle = "";
  let submitButton = "";

  if (award) {
    formTitle = "Edit Award";
    submitButton = "Update";
  } else {
    formTitle = "Create Award";
    submitButton = "Create";
  }

  // If Editing
  useEffect(() => {
    if (award) {
      Object.keys(award).forEach((key) => {
        if (!award[key]) {
          award[key] = "";
        }
      });

      setPrize(award.prize);
      setPagelink(award.pagelink);
      setYear(award.year);
      setDescription(award.description);
    }
  }, [award]);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleAwardResponse = (data) => {
    Toast({ message: data.message, type: "success" });
    // Update awards with images
    if (data.success && images.length > 0) {
      const { id } = data.award;
      const params = parseImages(id, images);
      const path = `/${painter.id}/awards/${id}/images`;

      postResource(path, params, handleImagesResponse);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      prize,
      pagelink,
      year,
      description,
      painter,
    };

    const params = parseGeneralParams(data);
    if (award) {
      const path = `/${painter.id}/awards/${award.id}`;
      putResource(path, params, handleAwardResponse);
    } else {
      const path = `/${painter.id}/awards`;
      postResource(path, params, handleAwardResponse);
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
        <form className="new-award-form" onSubmit={handleSubmit}>
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
                label="Prize"
                variant="outlined"
                name="prize"
                value={prize}
                required
                onChange={(e) => setPrize(e.target.value)}
              />
            </Grid>

            <PopulateYear year={year} setYear={setYear} />

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

            <Grid item xs={12}>
              <TextField
                fullWidth
                minRows={3}
                multiline
                label="Description"
                variant="outlined"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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
  const years = Array.from(new Array(60), (val, index) => startYear - index);

  return (
    <Grid item xs={4}>
      <FormControl fullWidth>
        <InputLabel id="publication-year-select-label">Year</InputLabel>
        <Select
          labelId="publication-year-select-label"
          id="publication-year-select"
          value={year}
          label="Year"
          onChange={(e) => setYear(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
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
