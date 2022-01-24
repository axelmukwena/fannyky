import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import backgroundOne from "../../images/buda-background.png";
import backgroundTwo from "../../images/fanny-background.png";

const AnotherBackground = function AnotherBackground() {
  const [height, setHeight] = useState(0);
  // const [width, setWidth] = useState(0);
  const [halfWidth, setHalfWidth] = useState(0);

  function handleResize() {
    setHeight(window.innerHeight);
    // setWidth(window.innerWidth);
    setHalfWidth(window.innerWidth / 2);

    const one = document.getElementById("painter-one");
    one.style.backgroundImage = `url(${backgroundOne})`;
    one.style.backgroundRepeat = "no-repeat";
    one.style.backgroundPosition = "center";
    one.style.backgroundSize = "cover";

    const two = document.getElementById("painter-two");
    two.style.backgroundImage = `url(${backgroundTwo})`;
    two.style.backgroundRepeat = "no-repeat";
    two.style.backgroundPosition = "center";
    two.style.backgroundSize = "cover";
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
    <Grid
      id="home-container"
      style={{ margin: 0, padding: 0 }}
      container
      spacing={2}
    >
      <Grid item style={{ margin: 0, padding: 0 }}>
        <div id="painter-one" style={{ height, width: halfWidth }} />
      </Grid>
      <Grid item style={{ margin: 0, padding: 0 }}>
        <div id="painter-two" style={{ height, width: halfWidth }} />
      </Grid>
    </Grid>
  );
};

export default AnotherBackground;
