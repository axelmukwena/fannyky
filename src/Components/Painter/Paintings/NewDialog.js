import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const NewDialog = function NewDialog({ painter, open, handleClose }) {
  const [title, setTitle] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [abstract, setAbstract] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(painter);
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose}>
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
      <Grid container justifyContent="center" alignItems="center">
        <form className="new-painting-form" onSubmit={handleSubmit}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid>
              <Typography>Admin Login Panel</Typography>
            </Grid>

            <Grid xs>
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

            <TextField
              fullWidth
              label="Date Created"
              variant="outlined"
              name="dateCreated"
              required
              value={dateCreated}
              onChange={(e) => setDateCreated(e.target.value)}
            />

            <TextField
              fullWidth
              label="Dimensions"
              variant="outlined"
              name="dimensions"
              required
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
            />

            <TextField
              fullWidth
              label="Abstract"
              variant="outlined"
              name="abstract"
              required
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />

            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button
              style={{ width: "100%", height: 40 }}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              style={{ width: "100%", height: 40 }}
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </Grid>
        </form>
      </Grid>
    </Dialog>
  );
};

export default NewDialog;
