import React from "react";

const AppWrap = (Component, classes) =>
  function HOC() {
    return (
      <div className={`app__container app__wrapper ${classes}`}>
        <Component />
      </div>
    );
  };

export default AppWrap;
