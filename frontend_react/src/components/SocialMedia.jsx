import React from "react";
import { SiInstagram, SiGmail, SiGithub } from "react-icons/si";

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://github.com/jaykapade">
        <SiGithub />
      </a>
    </div>
    <div>
      <a href="mailto:jaykapade@gmail.com">
        <SiGmail />
      </a>
    </div>
    <div>
      <a href="https://www.instagram.com/i_create_some_stuff">
        <SiInstagram />
      </a>
    </div>
  </div>
);

export default SocialMedia;
