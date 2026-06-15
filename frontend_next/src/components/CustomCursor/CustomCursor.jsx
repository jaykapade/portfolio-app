"use client";

import React from "react";
import useCanvasCursor from "../../hooks/useCanvasCursor";
import "./CustomCursor.scss";

const CustomCursor = () => {
  useCanvasCursor();

  return (
    <canvas
      id="canvas"
      className="snake-cursor-canvas"
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
