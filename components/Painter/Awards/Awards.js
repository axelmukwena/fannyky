import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import useUser from "../../../api/useUser";
import { deleteResource } from "../../../utilities/requests";
import Toast from "../../../utilities/toast";
import NextLink from "../../NextLink";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";

const Awards = function Awards({ awards, router, painter }) {
  const handleClick = (award) => {
    router.push(`/${award.painter.slug}/awards/${award.slug}`);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          fontFamily: "Roboto",
          marginBottom: 20,
        }}
        className="page-title"
      >
        Awards
      </Typography>
      <CustomHorizontal />
      <IsLoggedIn painter={painter} />
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
        sx={{ marginTop: "0" }}
      >
        <GetAwards awards={awards} handleClick={handleClick} />
      </Grid>
    </div>
  );
};

const GetAwards = function GetAwards({ awards, handleClick }) {
  if (awards.length > 0) {
    return awards.map((award) => (
      <Grid key={award.slug} item xs={12} sm={3}>
        <NextLink
          href="/[painterSlug]/awards/[awardSlug]"
          as={`/${award.painter.slug}/awards/${award.slug}`}
          style={{ textDecoration: "none" }}
        >
          <Card
            elevation={0}
            onClick={() => handleClick(award)}
            className="award"
          >
            <Typography
              sx={{
                color: "#f1f1f1",
                fontWeight: 900,
                padding: "10px",
                backgroundColor: "#787878",
              }}
            >
              {award.prize}
            </Typography>

            <Typography
              sx={{ color: "#525252", padding: "10px", textAlign: "left" }}
            >
              {award.description}
            </Typography>
            <Typography
              sx={{
                fontStyle: "italic",
                color: "#525252",
                padding: "0 10px 10px 10px",
              }}
            >
              — {award.year}
            </Typography>
          </Card>
        </NextLink>
        <DeleteAward award={award} />
      </Grid>
    ));
  }
  return "";
};

const DeleteAward = function DeleteAward({ award }) {
  const { user } = useUser();
  const { painter } = award;

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteAward = () => {
    const path = `/${painter.id}/awards/${award.id}`;
    deleteResource(`${path}`, handleImagesResponse);
  };

  if (user && painter) {
    return (
      <Button
        variant="contained"
        onClick={() => handleDeleteAward()}
        style={{ backgroundColor: "#b12222", marginTop: 10 }}
      >
        <Typography>Delete</Typography>
      </Button>
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
          New Award
        </Button>
        <NewDialog
          award={false}
          painter={painter}
          open={openNew}
          handleClose={handleCloseNew}
        />
      </div>
    );
  }
  return "";
};

export default Awards;
