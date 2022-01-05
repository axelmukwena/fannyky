import React, { useEffect, useState } from "react";
import { CardMedia, Typography, Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import { DeleteOutline } from "@mui/icons-material";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import DOMPurify from "dompurify";
import ImagesDialog from "./ImagesDialog";
import {
  deleteResource,
  getResource,
  postResource,
} from "../../../utils/requests";
import NewDialog from "./NewDialog";
import CustomHorizontal from "../CustomHorizontal";
import Toast from "../../../utils/toast";
import Loading from "../../Loading/Loading";

const Show = function Show({ match }) {
  const { url } = match;
  const [painting, setPainting] = useState(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  // const painter = useSelector((state) => state.currentPainter.painter);

  useEffect(() => {
    const path = url.replace("works", "paintings");
    getResource(path, setPainting);
  }, [url]);

  const handleOpen = (index) => {
    setCurrent(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!painting) {
    return <Loading />;
  }

  if (painting) {
    const { images } = painting;
    return (
      <div>
        <IsLoggedIn painting={painting} />
        <div className="row">
          {images.map((image, index) => (
            <Card
              key={image.url}
              id={image.url}
              elevation={0}
              style={{
                padding: 0,
                margin: 20,
                position: "relative",
                borderRadius: 0,
                border: "7px solid #e3e3e3",
                boxShadow: "rgb(28 28 28 / 24%) 1px 1px 1px 0px",
              }}
            >
              <CardMedia
                src={`${image.url}?w=700&h=700&fit=crop&auto=format`}
                alt={painting.title}
                loading="lazy"
                component="img"
                onClick={() => handleOpen(index)}
                style={{
                  cursor: "pointer",
                  width: 260,
                  height: 260,
                }}
              />
              <DeleteImage painting={painting} index={index} />
            </Card>
          ))}
        </div>
        <ImagesDialog
          painting={painting}
          current={current}
          setCurrent={setCurrent}
          open={open}
          handleClose={handleClose}
          show={false}
        />
        <div className="show-content" style={{ width: "80%" }}>
          <Typography
            style={{
              fontWeight: 900,
              fontSize: "1.4rem",
              fontFamily: "Roboto",
              flex: 1,
            }}
          >
            {painting.title}
          </Typography>

          <Typography>By {painting.painter.name}</Typography>

          <CustomHorizontal />

          <DateCreated painting={painting} />
          <Abstract painting={painting} />
          <Dimension painting={painting} />

          <GetDescription painting={painting} />
        </div>
      </div>
    );
  }
  return "";
};

const GetDescription = function GetDescription({ painting }) {
  const convertContentToHTML = (content) => {
    if (content) {
      const object = JSON.parse(content);
      const raw = convertFromRaw(object);
      const html = convertToHTML(raw);
      return html;
    }
    return null;
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  let description = convertContentToHTML(painting.description);
  const tempDes = description.replace("<p></p>", "");
  if (tempDes) {
    description = createMarkup(description);
    return (
      <div>
        <CustomHorizontal />

        <Typography
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={description}
        />
      </div>
    );
  }
  return null;
};

const DeleteImage = function DeleteImage({ painting, index }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteImage = () => {
    const path = `/${painter.id}/paintings/${painting.id}/image`;
    const imageId = painting.images[index].content.id;
    const params = { id: painting.id, image_id: imageId, painter };

    postResource(path, params, handleImagesResponse);
  };

  if (currentUser && painter.id) {
    return (
      <DeleteOutline
        onClick={() => handleDeleteImage()}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 0,
          cursor: "pointer",
          color: "black",
          fontSize: 21,
          backgroundColor: "rgb(255 255 255 / 28%)",
          borderRadius: "2px",
        }}
      />
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn({ painting }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  const handleDeleleResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeletePainting = () => {
    const path = `/${painter.id}/paintings/${painting.id}`;

    deleteResource(`${path}`, handleDeleleResponse);
  };

  if (currentUser && painter.id) {
    return (
      <div className="row" style={{ marginTop: 25, marginLeft: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          Edit Painting
        </Button>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleDeletePainting()}
        >
          Delete Painting
        </Button>
        <NewDialog
          painting={painting}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created) {
    return <Typography>{painting.date_created.split("-")[0]}</Typography>;
  }
  return "";
};

const Abstract = function Abstract({ painting }) {
  if (painting.abstract) {
    return <Typography>{painting.abstract}</Typography>;
  }
  return "";
};

const Dimension = function Dimension({ painting }) {
  if (painting.dimension) {
    return <Typography>{painting.dimension}</Typography>;
  }
  return "";
};

export default Show;
