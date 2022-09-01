import React from "react";
import { Navbar, SocialMedia } from "./components";

import {
  About,
  Skills,
  Testimonials,
  Works,
  Header,
  Footer,
} from "./containers";

import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <SocialMedia />
      <Header />
      <About />
      <Works />
      <Skills />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default App;
