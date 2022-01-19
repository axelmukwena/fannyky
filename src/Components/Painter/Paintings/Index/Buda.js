import { DeleteOutline, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Typography,
  Grid,
  Box,
  CardMedia,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { deleteResource, getResource } from "../../../../utils/requests";
import Toast from "../../../../utils/toast";
import ImagesDialog from "../../ImagesDialog";
import NewDialog from "../NewDialog";
import Loading from "../../../Loading/Loading";

const Buda = function ParseBuda({ painter }) {
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState("");

  const handleChange = (category) => (event, isExpanded) => {
    const panel = category.replace(/\s/g, "");
    setExpanded(isExpanded ? panel : false);
    setShow(isExpanded ? category : "");
  };

  if (painter.paintings_categories.length === 0) return null;

  return (
    <>
      <IsLoggedIn />
      {painter.paintings_categories.map((category) => {
        return (
          <Accordion
            key={category}
            elevation={0}
            expanded={expanded === category.replace(/\s/g, "")}
            onChange={handleChange(category)}
            sx={{ borderBottom: "1px solid #00000012" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls={`${category.replace(/\s/g, "")}-content`}
              id={category.replace(/\s/g, "")}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  margin: "0 0 0 5px",
                  color: "#525252",
                }}
              >
                {category}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0 }}>
              {show === category && <CategoryPaintings category={category} />}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

const CategoryPaintings = function CategoryPaintings({ category }) {
  const { path } = useRouteMatch();

  const [paintings, setPaintings] = useState([]);
  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();

  function handleResize() {
    setWidth(window.innerWidth);
  }

  function handlePaintings(newPaintings) {
    if (newPaintings.length > 0) {
      setPaintings(newPaintings);
      setLoaded(true);
    }
  }

  // You need to add `/paintings` to path
  // because `/paintings` is root for a painter
  // If you see in publications, no need
  // to add `/publications` to `path`
  useEffect(() => {
    getResource(`${path}/paintings_category/${category}`, handlePaintings);

    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [path]);

  const handleOpenImages = (painting) => {
    if (width > 900) {
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
      <Paintings
        width={width}
        paintings={paintings}
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

const Paintings = function Paintings({ width, paintings, handleOpenImages }) {
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
    return (
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
    );
  }

  if (paintings.length === 0) {
    return <Typography>No paintings in this category</Typography>;
  }
  return null;
};

const AddPhotos = function AddPhotos({ width, paintings, handleOpenImages }) {
  const [visible, setVisible] = useState(true);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });

      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
    return null;
  }, [visible, placeholderRef]);

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
      {visible ? (
        <Card
          elevation={0}
          sx={{
            padding: 0,
            margin: 0,
            position: "relative",
            borderRadius: 0,
            backgroundColor: "#f1f1f1",
            height: painting.images.length > 0 ? "fit-content" : paintingWidth,
            width: painting.images.length > 0 ? "fit-content" : paintingWidth,
          }}
        >
          {painting.images.length > 0 && (
            <>
              <CardMedia
                component="img"
                src={`${painting.images[0].url}`}
                alt={painting.title}
                height={height}
                loading="lazy"
                className="painting-card-index"
                sx={{
                  height,
                  width: paintingWidth,
                }}
                onClick={() => handleOpenImages(painting)}
              />
              <DeletePainting painting={painting} />
            </>
          )}
        </Card>
      ) : (
        <Box
          sx={{ height, backgroundColor: "#f1f1f1" }}
          aria-label={painting.title}
          ref={placeholderRef}
        />
      )}

      {painting.title && (
        <Typography className="painting-title-index-typography">
          <Link
            to={`${painting.painter.slug}/works/${painting.slug}`}
            className="painting-title-index"
            style={{ fontWeight: 500 }}
          >
            {painting.title.length > trim
              ? painting.title.substring(0, trim) + trimEnd
              : painting.title}
          </Link>
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
        sx={{
          position: "absolute",
          top: "20px",
          right: "25px",
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

  if (currentUser && painter) {
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

export default Buda;

/* function setPaintings(paintings) {
    setGroupOne([]);
    setGroupTwo([]);
    setGroupThree([]);
    setGroupFour([]);
    setGroupFive([]);

    // If fanny wong
    if (paintings.length > 0) {
      const key = "category";

      // https://stackoverflow.com/a/47385953/8050183
      const groups = paintings.reduce((hash, obj) => {
        if (obj[key] === undefined) return hash;
        return Object.assign(hash, {
          [obj[key]]: (hash[obj[key]] || []).concat(obj),
        });
      }, {});

      const setGroups = [
        setGroupOne,
        setGroupTwo,
        setGroupThree,
        setGroupFour,
        setGroupFive,
      ];

      const keys = Object.keys(groups);
      for (let i = 0; i < keys.length; i += 1) {
        const setGroup = setGroups[i];
        const group = groups[keys[i]];
        setGroup(group);
      }
    }

    setLoaded(true);
  }
 */
