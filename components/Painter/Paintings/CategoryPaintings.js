import { DeleteOutline } from "@mui/icons-material";
import { Typography, Grid, Card } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import ImagesDialog from "../ImagesDialog";
import NextLink from "../../NextLink";
import ImageLoader from "../../ImageLoader";
import useUser from "../../../api/useUser";
import { imageUrl } from "../../../utilities/helpers";

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

  for (let i = 0; i < paintings.length; i += 1) {
    const painting = paintings[i];
    console.log("Painting:", painting.title, "Category:", painting.category);
    console.log(painting.images);
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
                src={imageUrl(painting.images[0].small)}
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
                src={imageUrl(painting.images[0].large)}
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

export default CategoryPaintings;
