import { Button, Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { deleteResource, getResource } from "../../../utils/requests";
import CustomHorizontal from "../CustomHorizontal";
import NewDialog from "./NewDialog";

const Index = function Index() {
  const { path } = useRouteMatch();
  const [awards, setAwards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getResource(path, setAwards);
  }, [path]);

  const handleClick = (url) => {
    console.log(url);
    history.push(url);
  };

  const GetAwards = function GetAwards() {
    if (awards.length > 0) {
      return awards.map((award) => (
        <div key={award.slug} style={{ margin: "25px 25px 0 0" }}>
          <Card
            elevation={0}
            onClick={() => handleClick(`awards/${award.slug}`)}
            style={{
              cursor: "pointer",
              fontSize: 13,
              width: 200,
              minHeight: 180,
              color: "#787878",
              backgroundColor: "#e7e7e7",
              padding: 0,
            }}
          >
            <div style={{ padding: 10, backgroundColor: "#787878" }}>
              <Typography style={{ color: "#f1f1f1", fontWeight: 900 }}>
                {award.prize}
              </Typography>
            </div>

            <div style={{ padding: 10 }}>
              <Typography>{award.description}</Typography>
            </div>
            <div style={{ fontStyle: "italic", padding: "0 10px 10px 10px" }}>
              <Typography>— {award.year}</Typography>
            </div>
          </Card>
          <DeleteAward award={award} />
        </div>
      ));
    }
    return "";
  };

  return (
    <div className="resource-container" style={{ width: "70%" }}>
      <Typography
        style={{
          fontWeight: 600,
          fontSize: "1rem",
          fontFamily: "Roboto",
          marginBottom: 20,
        }}
      >
        Awards
      </Typography>
      <CustomHorizontal />
      <IsLoggedIn />
      <div className="row">
        <GetAwards />
      </div>
    </div>
  );
};

const DeleteAward = function DeleteAward({ award }) {
  const currentUser = useSelector((state) => state.currentUser.user);
  const painter = useSelector((state) => state.currentPainter.painter);

  const handleImagesResponse = (data) => {
    console.log("Response", data);
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
