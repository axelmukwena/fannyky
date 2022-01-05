import { Button, Card, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import Toast from "../../../utils/toast";
import Loading from "../../Loading/Loading";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [awards, setAwards] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getResource(path, setAwards);
  }, [path]);

  const handleClick = (url) => {
    history.push(url);
  };

  if (!awards) {
    return <Loading />;
  }

  return (
    <div className="resource-container">
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
      <IsLoggedIn />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
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
      <Grid key={award.slug} item xs={12} sm={3} className="award-grid">
        <Card
          elevation={0}
          onClick={() => handleClick(`awards/${award.slug}`)}
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
        <DeleteAward award={award} />
      </Grid>
    ));
  }
  return "";
};

const DeleteAward = function DeleteAward({ award }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    Toast({ message: data.message, type: "success" });
  };

  const handleDeleteAward = () => {
    const path = `/${painter.id}/awards/${award.id}`;

    deleteResource(`${path}`, handleImagesResponse);
  };

  if (currentUser && painter.id) {
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

export default Index;
