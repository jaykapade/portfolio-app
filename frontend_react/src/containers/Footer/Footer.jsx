import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {
    setLoading(true);

    const contact = {
      _type: "contact",
      name,
      email,
      message,
    };
    if (!name.length || !email.length || !message.length) {
      toast.error("Need to submit all details");
      return;
    }

    client
      .create(contact)
      .then(() => {
        toast.success("Message sent successfully");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again");
        setLoading(false);
      });
  };

  return (
    <>
      <h2 className="head-text">Let's Talk</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:jaykapade@gmail.com" className="p-text">
            jaykapade@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 7768098624" className="p-text">
            +91 7768098624
          </a>
        </div>
      </div>

      <div className="app__footer-form app__flex">
        <div className="app__flex">
          <input
            type="text"
            className="p-text"
            placeholder="Your Name*"
            name="name"
            value={name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="app__flex">
          <input
            type="email"
            className="p-text"
            placeholder="Your Email*"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <textarea
            className="p-text"
            placeholder="Your Message*"
            name="message"
            value={message}
            onChange={handleChangeInput}
          ></textarea>
        </div>
        <button type="button" className="p-text" onClick={handleSubmit}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default AppWrap(MotionWrap(Footer, "app__footer"), "app__whitebg");
