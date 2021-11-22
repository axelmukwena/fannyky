import { Close } from "@mui/icons-material";
import { Card, CardMedia, Typography } from "@mui/material";
import React, { useState } from "react";

const useForceUpdate = () => {
  const state = useState(false);
  return () => state[1]((s) => !s);
};

const UploadImages = function UploadImages({ files, setFiles }) {
  const forceUpdate = useForceUpdate();

  const chooseFiles = () => {
    const input = document.getElementById("choose-files-input");
    input.click();
  };

  const loadFiles = (e) => {
    const fileObjects = e.target.files;
    for (let i = 0; i < fileObjects.length; i += 1) {
      const url = URL.createObjectURL(fileObjects[i]);
      setFiles((oldFiles) => [...oldFiles, url]);
    }

    forceUpdate();
  };

  const removeFile = (index) => {
    files.splice(index, 1);

    const input = document.getElementById("choose-files-input");
    input.value = "";
    forceUpdate();
  };

  return (
    <div className="files-upload-container">
      <div
        className="choose-files"
        onClick={chooseFiles}
        onKeyPress={chooseFiles}
        role="button"
        tabIndex="0"
        style={{
          border: "2px dashed #b9b9b9",
          borderRadius: 4,
          marginBottom: 16,
          position: "relative",
        }}
      >
        <Typography
          style={{
            padding: "16.5px 14px",
            textAlign: "center",
          }}
        >
          Drag or Click to Upload
        </Typography>
        <input
          type="file"
          id="choose-files-input"
          onChange={loadFiles}
          multiple
          style={{
            top: 0,
            position: "absolute",
            width: "100%",
            padding: "16.5px 14px",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>
      <div id="loaded-files-container" className="row">
        {files.map((url, index) => (
          <Card
            id={url}
            className="loaded-files"
            elevation={0}
            key={url}
            style={{
              padding: 0,
              margin: 4,
              width: "fit-content",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <CardMedia
              sx={{ height: 80 }}
              component="img"
              src={url}
              alt={url}
            />
            <Close
              onClick={() => removeFile(index)}
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                padding: 0,
                cursor: "pointer",
                color: "#f1f1f1",
                fontSize: 17,
                backgroundColor: "rgb(82 82 82 / 30%)",
                borderRadius: "100%",
              }}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
