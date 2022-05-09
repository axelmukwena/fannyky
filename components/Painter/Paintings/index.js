import { ExpandMore } from "@mui/icons-material";
import {
  Button,
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewDialog from "./NewDialog";
import Loading from "../../Loading/Loading";
import useUser from "../../../api/useUser";
import CategoryPaintings from "./CategoryPaintings";
import NextLink from "../../NextLink";

const Index = function Index({ currentCategory, paintings, painter }) {
  const [width, setWidth] = useState(0);

  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState("");

  function handleResize() {
    setWidth(window.innerWidth);

    if (currentCategory && window.innerWidth > 900) {
      setExpanded(currentCategory.slug);
      setShow(currentCategory.slug);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (category) => (event, isExpanded) => {
    const panel = category.slug;
    setExpanded(isExpanded ? panel : false);
    setShow(isExpanded ? category.slug : "");
  };

  if (!paintings) {
    return <Loading />;
  }

  // When no categories, just show all paintings
  if (
    painter.paintings_categories ||
    painter.paintings_categories?.length === 0
  ) {
    return (
      <>
        <IsLoggedIn painter={painter} />
        <CategoryPaintings paintings={paintings} width={width} />
      </>
    );
  }

  // Else, show current category
  return (
    <>
      <IsLoggedIn painter={painter} />

      {painter.paintings_categories &&
        painter.paintings_categories.map((category) => {
          return (
            <Accordion
              key={category.slug}
              elevation={0}
              expanded={expanded === category.slug}
              onChange={handleChange(category)}
              sx={{ borderBottom: "1px solid #00000012" }}
            >
              <NextLink
                href="[painterSlug]/category/[categorySlug]"
                as={`${painter.slug}/category/${category.slug}`}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`${category.slug}-content`}
                  id={category.slug}
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
                    {category.name}
                  </Typography>
                </AccordionSummary>
              </NextLink>
              <AccordionDetails sx={{ padding: 0 }}>
                {show === category && (
                  <CategoryPaintings paintings={paintings} width={width} />
                )}
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
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

export default Index;
