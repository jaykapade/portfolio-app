"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./About.scss";
import { client, urlFor } from "../../client";
import { AppWrap, MotionWrap } from "../../wrapper";
const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client.fetch(query).then((data) => setAbouts(data));
  }, []);

  return (
    <>
      <h2 className="head-text">
        My&nbsp;
        <span>Personal Skills</span> and&nbsp;
        <span>Abilities</span>
      </h2>
      <motion.div 
        className="app__profiles"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.15 }}
      >
        {abouts.map((about, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profiles-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl).url()} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about.title}
            </h2>
            <p className="p-text" style={{ marginTop: 10 }}>
              {about.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "app__whitebg",
  "about"
);
