import React from "react";
import { Card, CardMedia } from "@material-ui/core";
import Carousel from "react-material-ui-carousel";

const Images = function Images({ images }) {
  if (images) {
    return (
      <Carousel>
        {images.map((image) => (
          <Card key={image.url}>
            <CardMedia component="img" image={image.src.large} />
          </Card>
        ))}
      </Carousel>
    );
  }
  return "";
};

export default Images;
