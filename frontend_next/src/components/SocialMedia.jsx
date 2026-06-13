"use client";

import React from "react";
import { SiInstagram, SiGithub } from "react-icons/si";
import { ImProfile } from "react-icons/im";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a
        href="https://drive.google.com/file/d/1-_6ISEGLOIZQgAJyGsS9aEhdn5mJZdpu/view?usp=sharing"
        target="_blank"
        rel="noreferrer"
        title="Resume"
      >
        <ImProfile />
      </a>
    </div>
    <div>
      <a
        href="https://github.com/jaykapade"
        target="_blank"
        rel="noreferrer"
        title="Github"
      >
        <SiGithub />
      </a>
    </div>
    <div>
      <a
        href="https://www.instagram.com/i_create_some_stuff"
        target="_blank"
        rel="noreferrer"
      >
        <SiInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
