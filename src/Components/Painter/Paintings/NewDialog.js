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
import React, { useState } from "react";
import UploadImages from "./UploadImages";

const NewDialog = function NewDialog({ painter, open, handleClose }) {
  const [title, setTitle] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [abstract, setAbstract] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(painter);
    console.log(description);
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
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Date Created"
                variant="outlined"
                name="dateCreated"
                required
                value={dateCreated}
                onChange={(e) => setDateCreated(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Dimensions"
                variant="outlined"
                name="dimensions"
                required
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
              />
            </Grid>

            <Grid item xs={6} md={8}>
              <TextField
                fullWidth
                label="Abstract"
                variant="outlined"
                name="abstract"
                required
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
                required
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
