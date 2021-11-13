import React, { useEffect, useState } from "react";
import { Card, CardMedia, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPhotos, getPublicData } from "../../utils/Helpers";
import { updateSiteName } from "../Menu/menuSlice/currentMenuSlice";
import { paintersMenu } from "../Menu/menuSlice/updateMenu";
import "./Home.css";

const Home = function Home() {
  const dispatch = useDispatch();
  const [paintings, setPaintings] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [columnQty, setColumnQty] = useState(1);

  // On screen width changes
  const handleResize = () => {
    if (window.innerWidth < 540) {
      setColumnQty(1);
    } else if (window.innerWidth <= 1024) {
      setColumnQty(2);
    } else {
      setColumnQty(3);
    }
  };

  useEffect(() => {
    getPhotos(setPhotos, "painting");
    getPublicData(setPaintings, "/explorers");

    paintersMenu(dispatch);
    dispatch(updateSiteName(["Buda Fans", "/"]));

    // Initialize size
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [dispatch]);

  // sort Paintings into columns
  const SortIntoColumns = () => {
    if (paintings.length > 0 && photos.length > 0) {
      // Check if correct rows to fill all paintings will
      // be created per column. If not, add one more row
      let rows = Math.round(paintings.length / columnQty);
      const paintingsCountApprox = rows * columnQty;
      if (paintingsCountApprox < paintings.length) {
        rows += 1;
      }

      const columns = [];
      for (let i = 0; i < columnQty; i += 1) {
        const col = [];
        let index = i;

        for (let j = 0; j < rows; j += 1) {
          if (index < paintings.length) {
            paintings[index].image =
              photos[photos.length - index - 1].src.large2x;
            paintings[index].index = index;
            col.push(paintings[index]);
          }
          index += columnQty;
        }
        if (col.length > 0) {
          columns.push(col);
        }
      }

      return columns.map((column) => (
        <div key={column[0].slug} className="paintings_column">
          {column.map((painting) => (
            <div key={painting.id} className="painting-home">
              <Card
                style={{
                  width: "100%",
                  borderRadius: 8,
                  boxShadow: "rgb(140 152 164 / 18%) 0px 0px 14px 0px",
                }}
              >
                <CardMedia
                  component="img"
                  src={painting.image}
                  alt={painting.title}
                />
              </Card>
            </div>
          ))}
        </div>
      ));
    }
    return "";
  };

  return (
    <Grid container spacing={4}>
      <div className="explorer">
        <div className="explorers">
          <SortIntoColumns />
        </div>
      </div>
    </Grid>
  );
};

export default Home;
