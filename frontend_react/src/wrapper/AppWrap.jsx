import React from "react";

const AppWrap = (Component) =>
  function HOC() {
    return (
      <div className="app__container app__wrapper app__flex">
        <Component />
      </div>
    );
  };

export default AppWrap;
