"use client";

import React from "react";
import { motion } from "framer-motion";
import { images } from "../../constants";
import Image from "next/image";

import "./Header.scss";
import { AppWrap } from "../../wrapper";

const Header = () => {
  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span className="wave-emoji">👋</span>
            <div style={{ marginLeft: "1.25rem" }}>
              <p className="p-text">Hello, I am </p>
              <h1 className="head-text">Jay Kapade</h1>
            </div>
          </div>
          <div className="tag-cmp app__flex">
            <p className="p-text">FullStack Web Developer &nbsp;💻</p>
            <p className="p-text">ML / AI Developer &nbsp;🤖</p>
            <p className="p-text">UI/UX Designer &nbsp;✏️</p>
            <p className="p-text">3d Artist and Illustrator &nbsp;🎨</p>
          </div>
        </div>
      </motion.div>
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 0.5, delayChildren: 0.5, y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
        className="app__header-img"
      >
        <Image src={images.profile} alt="profile-img" />
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "app__flex", "home");
