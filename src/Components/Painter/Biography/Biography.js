import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Biography = function Biography({ match }) {
  const { url } = match;
  const painter = useSelector((state) => state.currentPainter.painter);

  console.log(url);
  return (
    <div
      className="biography-container"
      style={{ margin: "20px 15px", width: "50%" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography
            style={{
              fontWeight: 600,
              fontSize: "1rem",
              fontFamily: "Roboto",
            }}
          >
            Biography
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "0.9rem",
              fontFamily: "Roboto",
              letterSpacing: "0.03rem",
            }}
          >
            {painter.about}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Biography;
