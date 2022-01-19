/* eslint-disable react/jsx-props-no-spreading */
import { Close } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { parseImages, parseGeneralParams } from "../../../utils/helpers";
import { postResource, putResource } from "../../../utils/requests";
import UploadImages from "../UploadImages";
import Toast from "../../../utils/toast";

const EditDialog = function EditDialog({ painter, open, handleClose }) {
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [pagelink, setPagelink] = useState("");
  const [about, setAbout] = useState(() => EditorState.createEmpty());
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState([]);
  const [paintingsCategories, setPaintingsCategories] = useState([]);
  const [category, setCategory] = useState("");
  const required = false;

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
    setRank(painterObject.rank);
    setPagelink(painterObject.pagelink);
    setEmail(painterObject.email);
    setPhone(painterObject.phone);
    setLink(painterObject.link);
    setPaintingsCategories(painterObject.paintings_categories);
  }, [painter]);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handlePainterResponse = (data) => {
    Toast({ message: data.message, type: "success" });
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
      rank,
      name,
      pagelink,
      about: stringAbout,
      email,
      phone,
      link,
      paintings_categories: paintingsCategories,
    };

    const params = parseGeneralParams(data);
    const path = `/${painter.id}`;
    putResource(path, params, handlePainterResponse);
  };

  const handleAddCategory = () => {
    const currentCategory = category.trim();
    if (!currentCategory) return;

    const included = paintingsCategories.includes(currentCategory);
    if (included) return;

    setPaintingsCategories((oldArray) => [...oldArray, currentCategory]);
    setCategory("");
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

            <Grid item xs={6}>
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
                label="Rank"
                variant="outlined"
                name="rank"
                value={rank}
                type="number"
                required
                onChange={(e) => setRank(e.target.value)}
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

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Profile Link"
                variant="outlined"
                name="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </Grid>

            {painter.rank === 1 && (
              <>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Artworks Category"
                    variant="outlined"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </Grid>

                <Grid item xs={4}>
                  <Button
                    style={{ height: 55, width: "100%" }}
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddCategory()}
                  >
                    Add Category
                  </Button>
                </Grid>

                <Categories
                  paintingsCategories={paintingsCategories}
                  setPaintingsCategories={setPaintingsCategories}
                />
              </>
            )}

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
                multiple={false}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Categories = function Categories({
  paintingsCategories,
  setPaintingsCategories,
}) {
  const handleDelete = (currentCategory) => () => {
    setPaintingsCategories((categories) =>
      categories.filter((category) => category !== currentCategory)
    );
  };

  if (paintingsCategories.length > 0) {
    return (
      <Grid item xs={12}>
        <Paper
          elevation={0}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            listStyle: "none",
            p: 0.5,
            m: 0,
          }}
          component="ul"
        >
          {paintingsCategories.map((category) => {
            return (
              <ListItem
                key={category}
                sx={{ width: "fit-content", paddingLeft: "0" }}
              >
                <Chip
                  icon={null}
                  label={category}
                  onDelete={handleDelete(category)}
                />
              </ListItem>
            );
          })}
        </Paper>
      </Grid>
    );
  }
  return null;
};

export default EditDialog;
