import React from "react";
import { Navbar } from "./components";

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
