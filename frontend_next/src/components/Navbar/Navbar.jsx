"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { images } from "../../constants";
import Image from "next/image";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import "./Navbar.scss";

const navLinks = ["home", "about", "work", "skills", "contact"];

const menuVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.25 },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { x: 40, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 22 } },
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar">
      {/* Logo */}
      <div className="app__navbar-logo">
        <Image src={images.logo} alt="logo" />
      </div>

      {/* Desktop links */}
      <ul className="app__navbar-links">
        {navLinks.map((item) => (
          <li key={`link-${item}`} className="app__flex p-text">
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>

      {/* Mobile: hamburger + slide-in menu */}
      <div className="app__navbar-mobile">
        {/* Animated hamburger button */}
        <button
          className={`app__navbar-hamburger${toggle ? " is-open" : ""}`}
          onClick={() => setToggle((prev) => !prev)}
          aria-label={toggle ? "Close menu" : "Open menu"}
          aria-expanded={toggle}
        >
          <span className="bar bar--top" />
          <span className="bar bar--mid" />
          <span className="bar bar--bot" />
        </button>

        {/* Backdrop */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              className="app__navbar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setToggle(false)}
            />
          )}
        </AnimatePresence>

        {/* Slide-in panel */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              className="app__navbar-panel"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Panel header */}
              <div className="app__navbar-panel-header">
                <div className="panel-header-actions">
                  <ThemeToggle />
                  <button
                    className="panel-close"
                    onClick={() => setToggle(false)}
                    aria-label="Close menu"
                  >
                    <span className="bar bar--top" />
                    <span className="bar bar--bot" />
                  </button>
                </div>
              </div>

              {/* Nav links */}
              <motion.ul
                className="app__navbar-panel-links"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {navLinks.map((item) => (
                  <motion.li key={item} variants={itemVariants}>
                    <a
                      href={`#${item}`}
                      onClick={() => setToggle(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Panel footer */}
              <div className="app__navbar-panel-footer">
                <p>Jay Kapade &copy; {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
