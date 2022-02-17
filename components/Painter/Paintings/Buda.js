import { DeleteOutline, ExpandMore } from "@mui/icons-material";
import {
  Button,
  Typography,
  Grid,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
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

const Buda = function Buda({ paintings, painter }) {
  const [categories, setCategories] = useState(null);
  const [width, setWidth] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState("");

  function handleResize() {
    setWidth(window.innerWidth);
    const cats = painter.paintings_categories;
    if (cats.length > 0 && window.innerWidth > 900) {
      const first = cats[0];
      setExpanded(first.replace(/\s/g, ""));
      setShow(first);
    }
  }

  // eslint-disable-next-line no-extend-native
  Array.prototype.groupBy = function group(functionProp) {
    // eslint-disable-next-line react/no-this-in-sfc
    return this.reduce(function reduce(key, value) {
      (key[functionProp(value)] = key[functionProp(value)] || []).push(value);
      return key;
    }, {});
  };

  function parsePaintings(paindingsData) {
    const parsed = paindingsData.groupBy(function groupBy(painting) {
      return painting.category;
    });
    setCategories(parsed);
  }

  useEffect(() => {
    if (paintings) {
      parsePaintings(paintings);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (category) => (event, isExpanded) => {
    const panel = category.replace(/\s/g, "");
    setExpanded(isExpanded ? panel : false);
    setShow(isExpanded ? category : "");
  };

  if (painter.paintings_categories.length === 0) return null;

  if (!categories) {
    return <Loading />;
  }

  return (
    <>
      <IsLoggedIn painter={painter} />
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
              sx={{ padding: "0px" }}
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
              {show === category && (
                <CategoryPaintings
                  paintings={categories[category]}
                  width={width}
                />
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

const CategoryPaintings = function CategoryPaintings({ paintings, width }) {
  const router = useRouter();

  const [openImages, setOpenImages] = useState(false);
  const [selected, setSelected] = useState();
  const [current, setCurrent] = useState(0);

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

  if (paintings && paintings.length > 0) {
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

  return <Typography>No paintings in this category</Typography>;
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
                priority
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
            href="[painterSlug]/works/[workSlug]"
            as={`${painting.painter.slug}/works/${painting.slug}`}
            className="painting-title-index"
            style={{ fontWeight: 500 }}
          >
            {painting.title.length > trim
              ? painting.title.substring(0, trim) + trimEnd
              : painting.title}
          </NextLink>
        </Typography>
      )}

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
