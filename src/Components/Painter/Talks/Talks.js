import React from "react";
import { Typography } from "@mui/material";

const Talks = function Talks({ match }) {
  const { url } = match;
  console.log(url);
  return <Typography>Talks</Typography>;
};

export default Talks;
