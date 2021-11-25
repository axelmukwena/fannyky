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
import { parseImages, parsePainterParams } from "../../../utils/helpers";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";

const EditDialog = function EditDialog({ painter, open, handleClose }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState(() => EditorState.createEmpty());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [images, setImages] = useState([]);
  const [required, setRequired] = useState(true);

  useEffect(() => {
    // New painter object because I
    // can not edit the Painter Slice Redux
    const painterObject = {};
    Object.keys(painter).forEach((key) => {
      if (!painter[key]) {
        painterObject[key] = "";
      } else {
        painterObject[key] = painter[key];
      }
    });

    if (painter.about) {
      const object = JSON.parse(painterObject.about);
      const raw = convertFromRaw(object);
      const editorState = EditorState.createWithContent(raw);
      setAbout(editorState);
    }

    setName(painterObject.name);
    setEmail(painterObject.email);
    setPhone(painterObject.phone);
    setFacebook(painterObject.facebook);
    setTwitter(painterObject.twitter);
    setInstagram(painterObject.instagram);

    if (painter.images.length > 0) {
      setRequired(false);
    }
  }, [painter]);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handlePainterResponse = (data) => {
    console.log("Response", data);
    // Update paintings with images
    if (data.success && images.length > 0) {
      const { id } = data.painter;
      const params = parseImages(id, images);
      const path = `/${painter.id}/images`;

      postResource(path, params, handleImagesResponse);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const rawAbout = convertToRaw(about.getCurrentContent());
    const stringAbout = JSON.stringify(rawAbout);

    const data = {
      id: painter.id,
      name,
      about: stringAbout,
      email,
      phone,
      facebook,
      twitter,
      instagram,
    };

    const params = parsePainterParams(data);
    const path = `/${painter.id}`;
    putResource(path, params, handlePainterResponse);
  };

  return (
    <Dialog
      maxWidth={false}
      PaperProps={{ style: { width: "47%" } }}
      open={open}
      scroll="body"
    >
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
                Edit Painter
              </DialogTitle>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                autoFocus
                label="Name"
                variant="outlined"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Phone"
                variant="outlined"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Facebook"
                variant="outlined"
                name="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Instagram"
                variant="outlined"
                name="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Twitter"
                variant="outlined"
                name="twitter"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography style={{ margin: 9, color: "#626262" }}>
                About
              </Typography>
              <div
                style={{
                  border: "1px solid rgb(185, 185, 185)",
                  borderRadius: 4,
                }}
              >
                <Editor
                  fullWidth
                  editorState={about}
                  onEditorStateChange={setAbout}
                />
              </div>
            </Grid>

            <Grid item xs={12}>
              <UploadImages
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
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
