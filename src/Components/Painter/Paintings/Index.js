import { DeleteOutline } from "@mui/icons-material";
import { Button, Typography, Grid, Box, CardMedia } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import Toast from "../../../utils/toast";
import ImagesDialog from "../ImagesDialog";
import NewDialog from "./NewDialog";
import Loading from "../../Loading/Loading";

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
  const [width, setWidth] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  function setPaintings(paintings) {
    setGroupOne([]);
    setGroupTwo([]);
    setGroupThree([]);
    setGroupFour([]);
    setGroupFive([]);

    if (paintings) {
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
      setLoaded(true);
    }
  }

  function handleResize() {
    if (window.innerWidth > 900) {
      setWidth(window.innerWidth);
    } else {
      setWidth(null);
    }
  }

  // You need to add `/paintings` to path
  // because `/paintings` is root for a painter
  // If you see in publications, no need
  // to add `/publications` to `path`
  useEffect(() => {
    getResource(`${path}/paintings`, setPaintings);

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [path]);

  const handleOpenImages = (painting) => {
    if (width) {
      setSelected(painting);
      setOpenImages(true);
    } else {
      history.push(`${painting.painter.slug}/works/${painting.slug}`);
    }
  };

  const handleCloseImages = () => {
    setOpenImages(false);
    setCurrent(0);
  };

  if (!loaded) {
    return <Loading />;
  }

  return (
    <>
      <IsLoggedIn />
      <Group
        width={width}
        paintings={groupOne}
        handleOpenImages={handleOpenImages}
      />
      <Group
        width={width}
        paintings={groupTwo}
        handleOpenImages={handleOpenImages}
      />
      <Group
        width={width}
        paintings={groupThree}
        handleOpenImages={handleOpenImages}
      />
      <Group
        width={width}
        paintings={groupFour}
        handleOpenImages={handleOpenImages}
      />
      <Group
        width={width}
        paintings={groupFive}
        handleOpenImages={handleOpenImages}
      />
      <ImagesDialog
        resource={selected}
        current={current}
        setCurrent={setCurrent}
        open={openImages}
        handleClose={handleCloseImages}
        show
      />
    </>
  );
};

const Group = function Group({ width, paintings, handleOpenImages }) {
  let justifyContent = "flex-start";
  let spacing = 0;
  if (!width) {
    justifyContent = "space-evenly";
    spacing = 0;
  }

  if (paintings.length > 0) {
    const year = paintings[0].rankdate.split("-")[0];
    return (
      <Box sx={{ marginBottom: "50px" }}>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Roboto",
            margin: "0 0 0 5px",
          }}
        >
          {year} Works
        </Typography>

        <Grid
          direction="row"
          justifyContent={justifyContent}
          alignItems="flex-start"
          container
          spacing={spacing}
        >
          <AddPhotos
            paintings={paintings}
            handleOpenImages={handleOpenImages}
          />
        </Grid>
      </Box>
    );
  }
  return null;
};

const AddPhotos = function AddPhotos({ paintings, handleOpenImages }) {
  return paintings.map((painting) => (
    <Grid item key={painting.slug} className="painting-grid-item">
      <CardMedia
        component="img"
        src={`${painting.images[0].url}`}
        alt={painting.title}
        // loading="lazy"
        className="painting-card-index"
        onClick={() => handleOpenImages(painting)}
      />
      <DeletePainting painting={painting} />
      <Typography className="painting-title-index-typography">
        <Link
          to={`${painting.painter.slug}/works/${painting.slug}`}
          className="painting-title-index"
          style={{ fontWeight: 500 }}
        >
          {painting.title}
        </Link>
      </Typography>

      {painting.date_created && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            margin: "0 8px",
            width: "120px",
          }}
        >
          {painting.date_created.split("-")[0]}
        </Typography>
      )}

      {painting.abstract && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            margin: "0 8px",
            width: "120px",
          }}
        >
          {painting.abstract}
        </Typography>
      )}

      {painting.dimension && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "12px",
            margin: "0 8px",
            width: "120px",
          }}
        >
          {painting.dimension}
        </Typography>
      )}
    </Grid>
  ));
};

const DeletePainting = function DeletePainting({ painting }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeletePainting = () => {
    const path = `/${painter.id}/paintings/${painting.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter) {
    return (
      <DeleteOutline
        onClick={() => handleDeletePainting()}
        style={{
          position: "absolute",
          top: 20,
          right: 25,
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

  if (currentUser && painter) {
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
