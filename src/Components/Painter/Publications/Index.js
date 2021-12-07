import { Button, Typography, CardMedia, Card } from "@mui/material";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    getResource(path, setPublications);
  }, [path]);

  const GetPublications = function GetPublications() {
    if (publications.length > 0) {
      return publications.map((publication) => (
        <div
          key={publication.slug}
          className="publication row"
          style={{
            // border: "1px solid #e5e5e5",
            borderRadius: 4,
            padding: 0,
            width: "100%",
            alignItems: "center",
            boxShadow: "rgb(28 28 28 / 7%) 0px 0px 6px 1px",
          }}
        >
          <Link to={`publications/${publication.slug}`}>
            <CardImage publication={publication} />
          </Link>
          <div
            className="publications-index-details"
            style={{ margin: 15, width: "80%" }}
          >
            <Link
              to={`publications/${publication.slug}`}
              className="publication-title-index"
            >
              {publication.title}
            </Link>
            <Typography style={{ fontSize: "0.8rem", color: "#606060" }}>
              {publication.organization}, {publication.location}, Published:{" "}
              {publication.year}
            </Typography>

            <TrimDescription publication={publication} />

            <DeletePublication publication={publication} />
          </div>
        </div>
      ));
    }
    return "";
  };

  return (
    <div className="resource-container" style={{ width: "80%" }}>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          fontFamily: "Roboto",
          marginBottom: 20,
        }}
        className="page-title"
      >
        Publications
      </Typography>

      <CustomHorizontal />

      <IsLoggedIn />
      <div className="row" style={{ marginTop: 15 }}>
        <GetPublications />
      </div>
    </div>
  );
};

const TrimDescription = function TrimDescription({ publication }) {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const convertContentToHTML = (content) => {
    if (content) {
      const object = JSON.parse(content);
      const raw = convertFromRaw(object);
      const html = convertToHTML(raw);
      const tempDes = html.replace("<p></p>", "");
      if (tempDes) {
        const markUp = createMarkup(html);
        return markUp;
      }
      return null;
    }
    return null;
  };

  // {des.substring(0, 300)}...
  let { description } = publication;
  description = convertContentToHTML(description);
  if (description) {
    const html = "__html";
    const items = description[html].split("</p>");
    if (items.length > 2) {
      let more = `${items[0]} ${items[1]}`;
      more = more.split("<p>");
      let text = "";
      for (let i = 0; i < more.length; i += 1) {
        text += more[i];
      }

      description[html] = text;
    }

    if (description[html].length > 80) {
      description[html] = `${description[html].substring(0, 300)}...`;
      return (
        <div>
          <Typography
            style={{ marginTop: 20 }}
            dangerouslySetInnerHTML={description}
          />
        </div>
      );
    }
    return (
      <Typography
        style={{ marginTop: 20 }}
        dangerouslySetInnerHTML={description}
      />
    );
  }
  return null;
};

const CardImage = function CardImage({ publication }) {
  if (publication.images.length > 0) {
    return (
      <Card
        id={publication.images[0].url}
        className="loaded-files"
        elevation={0}
        style={{
          padding: 0,
          marginRight: 5,
          borderRadius: "4px 0 0 4px",
          width: 130,
        }}
      >
        <CardMedia
          component="img"
          src={`${publication.images[0].url}`}
          alt={publication.title}
          loading="lazy"
          className="publication-image"
        />
      </Card>
    );
  }
  return null;
};

const DeletePublication = function DeletePublication({ publication }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeletePublication = () => {
    const path = `/${painter.id}/publications/${publication.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter.id) {
    return (
      <Button
        variant="contained"
        onClick={() => handleDeletePublication()}
        style={{ backgroundColor: "#b12222", marginTop: 10 }}
      >
        <Typography>Delete</Typography>
      </Button>
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn() {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);
  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (currentUser && painter.id) {
    return (
      <div className="row" style={{ marginTop: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          New Publication
        </Button>
        <NewDialog
          publication={false}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

export default Index;
