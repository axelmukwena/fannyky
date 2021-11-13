import React, { useEffect, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import { getPublicData } from "../../utils/Helpers";
import Canvas from "./Canvas";

const Landing = function Landing() {
  return (
    <div id="canvas-container">
      <Canvas />
      <PaintersButtons />
    </div>
  );
};

const PaintersButtons = function PaintersButtons() {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    getPublicData(setPainters, "/");
  }, []);

  if (painters.length > 0) {
    return (
      <Grid container spacing={1}>
        {painters.map((painter) => (
          <Grid key={painter.slug} item xs>
            <Stack direction="row" justifyContent="center">
              <Button variant="contained">{painter.name}</Button>
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  }
  return "";
};

export default Landing;
