import React from "react";
import { Typography } from "@mui/material";

const Contact = function Contact({ match }) {
  const { url } = match;
  console.log(url);
  return <Typography>Contact</Typography>;
};

export default Contact;
