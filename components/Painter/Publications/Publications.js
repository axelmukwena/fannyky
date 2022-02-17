import { Button, Typography, CardMedia, Card, Grid } from "@mui/material";
import DOMPurify from "dompurify";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import useUser from "../../../api/useUser";
import { imageUrl } from "../../../utilities/helpers";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import NextLink from "../../NextLink";
import NewDialog from "./NewDialog";

const Publications = function Publications({ publications, painter }) {
  const [width, setWidth] = useState(0);

  function handleResize() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          fontFamily: "Roboto",
          margin: "20px 0",
        }}
      >
        Publications
      </Typography>

      <IsLoggedIn painter={painter} />
      <div className="row" style={{ marginTop: 15 }}>
        <GetPublications publications={publications} width={width} />
      </div>
    </>
  );
};

const GetPublications = function GetPublications({ publications, width }) {
  const getSm = (publication) => {
    if (publication.images.length > 0) {
      return 10;
    }
    return 12;
  };

  if (publications) {
    return publications.map((publication) => (
      <Grid
        key={publication.slug}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          // borderRadius: "4px",
          border: "1px solid #dbdbdb",
          borderLeftWidth: "0",
          borderRightWidth: "0",
          borderBottomWidth: "0",
          padding: "20px 0",
          width: "100%",
          // backgroundColor: "#f7f7f7d4",
          // boxShadow: "rgb(28 28 28 / 7%) 0px 0px 6px 1px",
        }}
      >
        <CardImage publication={publication} width={width} />

        <Grid xs={12} sm={getSm(publication)} item>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            sx={{ padding: "15px", height: "100%" }}
          >
            <Grid item>
              <NextLink
                href="/[painterSlug]/publications/[publicationSlug]"
                as={`/${publication.painter.slug}/publications/${publication.slug}`}
                className="publication-title-index"
              >
                {publication.title}
              </NextLink>
            </Grid>
            <Grid item>
              <Typography style={{ fontSize: "0.8rem", color: "#606060" }}>
                {publication.organization}, {publication.location}
                <GetYear publication={publication} />
              </Typography>
            </Grid>
            <Grid item>
              <TrimDescription publication={publication} />
            </Grid>

            <DeletePublication publication={publication} />
          </Grid>
        </Grid>
      </Grid>
    ));
  }
  return "";
};

const GetYear = function GetYear({ publication }) {
  if (publication.year) {
    return `, Published: ${publication.year}`;
  }
  return null;
};

const TrimDescription = function TrimDescription({ publication }) {
  if (!publication || !publication.description) {
    return null;
  }

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
      description[html] = `${description[html].substring(0, 300)}`;
    }

    return (
      <>
        <Typography
          className="justify"
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={description}
        />
        <NextLink
          href="/[painterSlug]/publications/[publicationSlug]"
          as={`/${publication.painter.slug}/publications/${publication.slug}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              // fontWeight: 500,
              color: "#747474",
              ":hover": {
                textDecoration: "underline",
              },
            }}
          >
            more
          </Typography>
        </NextLink>
      </>
    );
  }
  return null;
};

const CardImage = function CardImage({ publication, width }) {
  if (publication.images.length > 0) {
    return (
      <Grid xs={12} sm={2} item>
        <NextLink
          href="/[painterSlug]/publications/[publicationSlug]"
          as={`/${publication.painter.slug}/publications/${publication.slug}`}
        >
          <Card
            elevation={0}
            style={{
              padding: 0,
              margin: "8px",
            }}
          >
            {width > 900 && (
              <CardMedia
                component="img"
                src={imageUrl(publication.images[0].small)}
                alt={publication.title}
              />
            )}

            {width <= 900 && (
              <CardMedia
                component="img"
                src={imageUrl(publication.images[0].medium)}
                alt={publication.title}
              />
            )}
          </Card>
        </NextLink>
      </Grid>
    );
  }
  return null;
};

const DeletePublication = function DeletePublication({ publication }) {
  const { user } = useUser();
  const { painter } = publication;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeletePublication = () => {
    const path = `/${painter.id}/publications/${publication.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (user && painter) {
    return (
      <Grid item>
        <Button
          variant="contained"
          onClick={() => handleDeletePublication()}
          style={{ backgroundColor: "#b12222", marginTop: 10 }}
        >
          <Typography>Delete</Typography>
        </Button>
      </Grid>
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

export default Publications;
