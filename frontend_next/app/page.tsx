export const dynamic = "force-dynamic";

import { Navbar, SocialMedia } from "../src/components";
import {
  About,
  Skills,
  Testimonials,
  Works,
  Header,
  Footer,
} from "../src/containers";

import "../src/App.scss";

export default function Home() {
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
}
