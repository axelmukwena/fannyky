import React, { useEffect, useRef, useState } from "react";

const Canvas = function Canvas({ position, margin, top }) {
  const canvasRef = useRef(null);
  const [x, setX] = useState(undefined);
  const [y, setY] = useState(undefined);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  function handleResize() {
    setHeight(window.innerHeight - margin);
    setWidth(window.innerWidth);

    // const container = document.getElementById("canvas-container");
    // container.style.backgroundImage = `url(${background})`
    // container.style.backgroundRepeat = "no-repeat";
    // container.style.backgroundPosition = "center";
    // container.style.backgroundSize = "cover";
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    // remove resize listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 5;
    context.lineCap = "round";

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    context.closePath();

    context.stroke();

    setX(e.pageX - canvas.offsetLeft);
    setY(e.pageY - canvas.offsetTop);
  };

  function clearDrawing() {
    setX(undefined);
    setY(undefined);
  }

  return (
    <canvas
      className="canvas"
      id="canvas"
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      onTouchEnd={clearDrawing}
      onMouseLeave={clearDrawing}
      ref={canvasRef}
      height={height}
      width={width}
      style={{ position, top, left: top }}
    />
  );
};

export default Canvas;
