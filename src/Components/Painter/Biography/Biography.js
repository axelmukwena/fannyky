import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Biography = function Biography({ match }) {
  const { url } = match;
  const painter = useSelector((state) => state.currentPainter.painter);

  console.log(url);
  if (painter.id) {
    return (
      <div className="biography-container" style={{ margin: 15, width: "50%" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography
              style={{
                fontWeight: 600,
                fontSize: "1.4rem",
                fontFamily: "Roboto",
              }}
            >
              Biography
            </Typography>
          </Grid>

          {painter.about.split("\\n").map((text) => (
            <Grid item xs={12}>
              <Typography
                style={{
                  fontWeight: 400,
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  fontFamily: "Roboto",
                  letterSpacing: "0.03rem",
                  // flex: 1,
                }}
              >
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
  return "";
};

export default Biography;
