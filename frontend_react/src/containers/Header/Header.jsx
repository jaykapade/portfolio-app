import React from "react";
import { motion } from "framer-motion";
import { images } from "../../constants";

import "./Header.scss";
import { AppWrap } from "../../wrapper";

const Header = () => {
  return (
    <div id="home" className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am </p>
              <h1 className="head-text">Jay Kapade</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">FullStack Web Developer &nbsp;💻</p>
            <p className="p-text">UI/UX Designer &nbsp;✏️</p>
            <p className="p-text">3d Artist and Illustrator &nbsp;🎨</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.profile} alt="profile-img" />
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "app__flex");
