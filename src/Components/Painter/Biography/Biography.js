import React from "react";
import { Typography } from "@mui/material";

const Biography = function Biography({ match }) {
  const { url } = match;
  console.log(url);
  return <Typography>Biography</Typography>;
};

export default Biography;
