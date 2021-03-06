import { DeleteOutline } from "@mui/icons-material";
import { Button, Typography, Grid, Box, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import ImagesDialog from "../ImagesDialog";
import NewDialog from "./NewDialog";
import Loading from "../../Loading/Loading";
import NextLink from "../../NextLink";
import ImageLoader from "../../ImageLoader";
import useUser from "../../../api/useUser";
import { imageUrl } from "../../../utilities/helpers";

const Fanny = function Fanny({ paintings, painter }) {
  const router = useRouter();

  const [groupOne, setGroupOne] = useState([]);
  const [groupTwo, setGroupTwo] = useState([]);
  const [groupThree, setGroupThree] = useState([]);
  const [groupFour, setGroupFour] = useState([]);
  const [groupFive, setGroupFive] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);

  function setPaintings(paintingsData) {
    setGroupOne([]);
    setGroupTwo([]);
    setGroupThree([]);
    setGroupFour([]);
    setGroupFive([]);

    // If fanny wong
    if (paintingsData.length > 0) {
      const currentYear = new Date().getFullYear();
      const startDate = new Date("2000-01-01");
      const diff = currentYear - 2000;
      const groupSize = Math.floor(diff / 5);

      const years = [];
      for (let i = 0; i < diff; i += groupSize) {
        const yearRoof = startDate.getFullYear() + i;
        years.push(yearRoof);
      }

      for (let i = 0; i < paintingsData.length; i += 1) {
        if (paintingsData[i].rankdate) {
          const paintingYear = paintingsData[i].rankdate.split("-")[0];

          if (paintingYear <= years[1]) {
            setGroupFive((old) => [...old, paintingsData[i]]);
          } else if (paintingYear <= years[2]) {
            setGroupFour((old) => [...old, paintingsData[i]]);
          } else if (paintingYear <= years[3]) {
            setGroupThree((old) => [...old, paintingsData[i]]);
          } else if (paintingYear <= years[4]) {
            setGroupTwo((old) => [...old, paintingsData[i]]);
          } else if (paintingYear > years[4]) {
            setGroupOne((old) => [...old, paintingsData[i]]);
          }
        }
      }
    }
    setLoaded(true);
  }

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    if (paintings) {
      setPaintings(paintings);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [paintings]);

  const handleOpenImages = (painting) => {
    if (width > 900) {
      setSelected(painting);
      setOpenImages(true);
    } else {
      router.push(`/${painting.painter.slug}/works/${painting.slug}`);
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
      <IsLoggedIn painter={painter} />
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
  if (width <= 900 && width > 600) {
    justifyContent = "space-between";
    spacing = 0;
  }

  if (width <= 600) {
    justifyContent = "center";
    spacing = 0;
  }

  if (paintings.length > 0) {
    let title = "";
    if (paintings[0].painter.rank === 1) {
      title = paintings[0].category;
    } else {
      title = `${paintings[0].rankdate.split("-")[0]} Works`;
    }

    return (
      <Box sx={{ marginBottom: "50px", marginTop: "20px" }}>
        <Typography
          style={{
            fontWeight: 600,
            fontSize: "1rem",
            fontFamily: "Roboto",
            margin: "0 0 0 15px",
          }}
        >
          {title}
        </Typography>

        <Grid
          direction="row"
          justifyContent={justifyContent}
          alignItems="flex-start"
          container
          spacing={spacing}
        >
          <AddPhotos
            width={width}
            paintings={paintings}
            handleOpenImages={handleOpenImages}
          />
        </Grid>
      </Box>
    );
  }
  return null;
};

const AddPhotos = function AddPhotos({ width, paintings, handleOpenImages }) {
  let paintingWidth = "120px";
  let height = "120px";
  let trim = 17;
  let trimEnd = "...";

  if (width <= 900) {
    paintingWidth = `${window.innerWidth - 60}px`;
    height = "100%";
    trim = 1000;
    trimEnd = "";
  }

  return paintings.map((painting) => (
    <Grid item key={painting.slug} className="painting-grid-item">
      <Card
        elevation={0}
        className="painting-card-index"
        sx={{
          padding: 0,
          position: "relative",
          borderRadius: 0,
          // backgroundColor: width > 900 ? "#e9e9e9 !important" : "none",
          height,
          width: painting.images.length > 0 ? paintingWidth : "fit-content",
        }}
      >
        {painting.images.length > 0 && (
          <>
            {width <= 900 && (
              <Image
                loader={ImageLoader}
                quality={40}
                src={imageUrl(painting.images[0].large)}
                alt={painting.title}
                placeholder="blur"
                blurDataURL="/static/assets/loading.gif"
                width={width - 60}
                height={width - 60}
                objectFit="cover"
                onClick={() => handleOpenImages(painting)}
              />
            )}

            {width > 900 && (
              <Image
                loader={ImageLoader}
                quality={40}
                src={imageUrl(painting.images[0].small)}
                alt={painting.title}
                placeholder="blur"
                blurDataURL="/static/assets/loading.gif"
                width={120}
                height={120}
                objectFit="cover"
                onClick={() => handleOpenImages(painting)}
              />
            )}

            <DeletePainting painting={painting} />
          </>
        )}
        {painting.images.length === 0 && (
          <Typography
            sx={{
              fontWeight: 400,
              fontSize: "0.75rem",
              margin: "0 8px",
              width: paintingWidth,
              "@media (max-width: 600px)": {
                margin: "0 4px",
                fontSize: "0.875rem",
              },
            }}
          >
            No Image
          </Typography>
        )}
      </Card>

      {painting.title && (
        <Typography className="painting-title-index-typography">
          <NextLink
            href={`/${painting.painter.slug}/works/${painting.slug}`}
            className="painting-title-index"
            style={{ fontWeight: 500 }}
          >
            {painting.title.length > trim
              ? painting.title.substring(0, trim) + trimEnd
              : painting.title}
          </NextLink>
        </Typography>
      )}

      {/* {painting.date_created && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.75rem",
            margin: "0 8px",
            width: paintingWidth,
            "@media (max-width: 600px)": {
              margin: "0 4px",
            },
          }}
        >
          {painting.date_created.split("-")[0]}
        </Typography>
      )} */}

      {painting.abstract && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.75rem",
            margin: "0 8px",
            width: paintingWidth,
            "@media (max-width: 600px)": {
              margin: "0 4px",
              fontSize: "0.875rem",
            },
          }}
        >
          {painting.abstract.length > trim
            ? painting.abstract.substring(0, trim) + trimEnd
            : painting.abstract}
        </Typography>
      )}

      {painting.dimension && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.75rem",
            margin: "0 8px",
            width: paintingWidth,
            "@media (max-width: 600px)": {
              margin: "0 4px",
              fontSize: "0.875rem",
            },
          }}
        >
          {painting.dimension.length > trim
            ? painting.dimension.substring(0, trim) + trimEnd
            : painting.dimension}
        </Typography>
      )}
    </Grid>
  ));
};

const DeletePainting = function DeletePainting({ painting }) {
  const { user } = useUser();
  const { painter } = painting;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeletePainting = () => {
    const path = `/${painter.id}/paintings/${painting.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (user && painter) {
    return (
      <DeleteOutline
        onClick={() => handleDeletePainting()}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          padding: 0,
          cursor: "pointer",
          color: "black",
          fontSize: "1.313rem",
          backgroundColor: "rgb(255 255 255 / 28%)",
          borderRadius: "2px",
        }}
      />
    );
  }
  return null;
};

const IsLoggedIn = function IsLoggedIn({ painter }) {
  const { user } = useUser();

  const [openNew, setOpenNew] = useState(false);

  const handleOpenNew = () => {
    setOpenNew(true);
  };

  const handleCloseNew = () => {
    setOpenNew(false);
  };

  if (user && painter) {
    return (
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} sm={6}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleOpenNew()}
          >
            New Painting
          </Button>
          <NewDialog
            painting={false}
            painter={painter}
            open={openNew}
            handleClose={handleCloseNew}
          />
        </Grid>
      </Grid>
    );
  }
  return "";
};

export default Fanny;
