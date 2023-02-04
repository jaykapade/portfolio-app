import React from "react";
import { SiInstagram, SiGmail, SiGithub } from "react-icons/si";
import { ImProfile } from "react-icons/im";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a
        href="https://resume.io/r/5cTDB7aYh"
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
      <a href="mailto:jaykapade@gmail.com" title="Mail">
        <SiGmail />
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
