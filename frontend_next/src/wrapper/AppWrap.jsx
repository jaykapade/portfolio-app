"use client";

import React from "react";

const AppWrap = (Component, classes, id) =>
  function HOC() {
    return (
      <div className={`app__container app__wrapper ${classes}`} id={id}>
        <Component />
      </div>
    );
  };

export default AppWrap;
