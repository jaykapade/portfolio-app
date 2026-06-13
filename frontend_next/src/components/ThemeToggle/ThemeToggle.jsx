"use client";

import React from "react";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../../context/ThemeProvider";
import "./ThemeToggle.scss";

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {mounted && theme === "dark" ? <HiSun /> : <HiMoon />}
    </button>
  );
};

export default ThemeToggle;
