import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getResource } from "../../utilities/requests";
import Canvas from "./Canvas";

const FrontOne = function FrontOne() {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    getResource("/", setPainters);
  }, []);

  return (
    <>
      {painters.length > 0 ? (
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <a href={`/${painters[0].slug}`} style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#525252",
                  padding: "15px 0",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {painters[0].name}
              </Typography>
            </a>
          </Grid>
          <Grid item xs={6}>
            <a href={`/${painters[1].slug}`} style={{ textDecoration: "none" }}>
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "#525252",
                  padding: "15px 0",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                {painters[1].name}
              </Typography>
            </a>
          </Grid>
        </Grid>
      ) : (
        <Typography>Loading...</Typography>
      )}
      <Canvas position="relative" margin={64} />
    </>
  );
};

export default FrontOne;
