import { DeleteOutline } from "@mui/icons-material";
import {
  Button,
  Typography,
  CardMedia,
  Card,
  ImageList,
  ImageListItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import ImagesDialog from "./ImagesDialog";
import NewDialog from "./NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [groupOne, setGroupOne] = useState([]);
  const [groupTwo, setGroupTwo] = useState([]);
  const [groupThree, setGroupThree] = useState([]);
  const [groupFour, setGroupFour] = useState([]);
  const [groupFive, setGroupFive] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);

  function setPaintings(paintings) {
    setGroupOne([]);
    setGroupTwo([]);
    setGroupThree([]);
    setGroupFour([]);
    setGroupFive([]);
    if (paintings.length > 0) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date("2000-01-01");
      const diff = currentYear - 2000;
      const groupSize = Math.floor(diff / 5);

      const years = [];
      for (let i = 0; i < diff; i += groupSize) {
        const yearRoof = startDate.getFullYear() + i;
        years.push(yearRoof);
      }

      // console.log(years);
      for (let i = 0; i < paintings.length; i += 1) {
        if (paintings[i].rankdate) {
          const paintingYear = paintings[i].rankdate.split("-")[0];

          if (paintingYear <= years[1]) {
            setGroupFive((old) => [...old, paintings[i]]);
          } else if (paintingYear <= years[2]) {
            setGroupFour((old) => [...old, paintings[i]]);
          } else if (paintingYear <= years[3]) {
            setGroupThree((old) => [...old, paintings[i]]);
          } else if (paintingYear <= years[4]) {
            setGroupTwo((old) => [...old, paintings[i]]);
          } else if (paintingYear > years[4]) {
            setGroupOne((old) => [...old, paintings[i]]);
          }
        }
      }
    }
  }

  // You need to add `/paintings` to path
  // because `/paintings` is root for a painter
  // If you see in publications, no need
  // to add `/publications` to `path`
  useEffect(() => {
    getResource(`${path}/paintings`, setPaintings);
  }, [path]);

  const handleOpenImages = (painting) => {
    setSelected(painting);
    setOpenImages(true);
  };

  const handleCloseImages = () => {
    setOpenImages(false);
  };

  return (
    <div className="resource-container">
      <IsLoggedIn />
      <Group paintings={groupOne} handleOpenImages={handleOpenImages} />
      <Group paintings={groupTwo} handleOpenImages={handleOpenImages} />
      <Group paintings={groupThree} handleOpenImages={handleOpenImages} />
      <Group paintings={groupFour} handleOpenImages={handleOpenImages} />
      <Group paintings={groupFive} handleOpenImages={handleOpenImages} />
      <ImagesDialog
        painting={selected}
        current={current}
        setCurrent={setCurrent}
        open={openImages}
        handleClose={handleCloseImages}
        show
      />
    </div>
  );
};

const Group = function Group({ paintings, handleOpenImages }) {
  if (paintings.length > 0) {
    const year = paintings[0].rankdate.split("-")[0];
    return (
      <div style={{ marginBottom: 70 }}>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Roboto",
            margin: "0 0 50px",
          }}
          className="page-title"
        >
          {year}
        </Typography>

        <div className="row">
          <AddPhotos
            paintings={paintings}
            handleOpenImages={handleOpenImages}
          />
        </div>
      </div>
    );
  }
  return null;
};

const AddPhotos = function AddPhotos({ paintings, handleOpenImages }) {
  if (paintings.length > 0) {
    // console.log(paintings);
    return (
      <ImageList cols={4} style={{ gap: "50px 120px" }}>
        {paintings.map((painting) => (
          <ImageListItem key={painting.slug}>
            <CardMedia
              component="img"
              src={`${painting.images[0].url}`}
              alt={painting.title}
              loading="lazy"
              className="painting-card-index"
              onClick={() => handleOpenImages(painting)}
            />
            <DeletePainting painting={painting} />
            <Typography style={{ margin: "8px 0", width: 160 }}>
              <Link
                to={`${painting.painter.slug}/works/${painting.slug}`}
                className="painting-title-index"
              >
                {painting.title}
              </Link>
            </Typography>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }
  return paintings.map((painting) => (
    <div key={painting.slug} className="painting">
      <CardImage painting={painting} handleOpenImages={handleOpenImages} />
      <div className="abstract">
        <Link
          to={`${painting.painter.slug}/works/${painting.slug}`}
          className="painting-title-index"
        >
          {painting.title}
        </Link>

        <Typography style={{ fontSize: "0.8rem", fontStyle: "italic" }}>
          <DateCreated painting={painting} /> {painting.abstract}
        </Typography>
      </div>
    </div>
  ));
};

const CardImage = function CardImage({ painting, handleOpenImages }) {
  if (painting.images.length > 0) {
    return (
      <Card
        id={painting.images[0].url}
        className="loaded-files"
        elevation={0}
        style={{
          padding: 0,
          margin: 0,
          position: "relative",
          borderRadius: 0,
        }}
      >
        <CardMedia
          component="img"
          // src={`${painting.image}?w=700&h=700&fit=crop&auto=format`}
          src={`${painting.images[0].url}?w=700&h=700&fit=crop&auto=format`}
          alt={painting.title}
          loading="lazy"
          className="painting-image"
          width={150}
          height={150}
          onClick={() => handleOpenImages(painting)}
          style={{ cursor: "pointer" }}
        />
        <DeletePainting painting={painting} />
      </Card>
    );
  }
  return null;
};

const DeletePainting = function DeletePainting({ painting }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
  };

  const handleDeletePainting = () => {
    const path = `/${painter.id}/paintings/${painting.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter.id) {
    return (
      <DeleteOutline
        onClick={() => handleDeletePainting()}
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

const DateCreated = function DateCreated({ painting }) {
  if (painting.date_created && painting.abstract) {
    return `${painting.date_created.split("-")[0]} - `;
  }
  if (painting.date_created) {
    return painting.date_created.split("-")[0];
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

  const newOpenCategory = () => {};

  if (currentUser && painter.id) {
    return (
      <div className="row" style={{ marginTop: 25 }}>
        <Button
          style={{ width: 200, height: 40, marginRight: 25 }}
          variant="contained"
          color="primary"
          onClick={() => handleOpenNew()}
        >
          New Painting
        </Button>
        <Button
          style={{ width: 200, height: 40 }}
          variant="contained"
          color="primary"
          onClick={() => newOpenCategory()}
        >
          New Category
        </Button>
        <NewDialog
          painting={false}
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
