import React from "react";
import { Typography } from "@mui/material";

const Awards = function Awards({ match }) {
  const { url } = match;
  console.log(url);
  return <Typography>Awards</Typography>;
};

export default Awards;
