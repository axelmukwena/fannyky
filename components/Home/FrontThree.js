import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { getResource } from "../../utilities/requests";
import BackGround from "./BackGround";

const FrontThree = function FrontThree() {
  return (
    <>
      <BackGround />
      <PaintersButtons />
    </>
  );
};

const PaintersButtons = function PaintersButtons() {
  const [painters, setPainters] = useState([]);

  useEffect(() => {
    getResource("/", setPainters);
  }, []);

  if (painters.length > 1) {
    return (
      <div className="buttons-container">
        <a href={`/${painters[0].slug}`}>
          <Button
            className="button-one"
            variant="outlined"
            size="large"
            style={{
              borderRadius: 4,
              border: "2px solid #e7e7e7",
              // backgroundColor: "#e7e7e7",
            }}
          >
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              {painters[0].name}
            </Typography>
          </Button>
        </a>
        <a href={`/${painters[1].slug}`}>
          <Button
            className="button-two"
            variant="outlined"
            size="large"
            style={{
              borderRadius: 4,
              border: "2px solid #e7e7e7",
              // backgroundColor: "#e7e7e7",
            }}
          >
            <Typography style={{ fontWeight: "bold", color: "white" }}>
              {painters[1].name}
            </Typography>
          </Button>
        </a>
        <PositionButtons />
      </div>
    );
  }
  return "";
};

const PositionButtons = function PositionButtons() {
  function handleResize() {
    const height = window.innerHeight;
    const width = window.innerWidth / 4;

    const one = document.querySelector(".button-one");
    one.style.marginTop = `-${height / 2}px`;
    one.style.marginLeft = `${width - one.offsetWidth / 2}px`;

    const two = document.querySelector(".button-two");
    two.style.marginTop = `-${height / 2}px`;
    two.style.marginLeft = `${3 * width - two.offsetWidth / 2}px`;
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return "";
};

export default FrontThree;
