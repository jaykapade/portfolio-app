import React from "react";

const AppWrap = (Component) =>
  function HOC() {
    return (
      <div className="app__container app__wrapper">
        <Component />
      </div>
    );
  };

export default AppWrap;
