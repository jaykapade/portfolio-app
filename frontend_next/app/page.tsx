export const dynamic = "force-dynamic";

import {
  Navbar,
  SocialMedia,
  CustomCursor,
  ScrollProgress,
} from "../src/components";
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
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <SocialMedia />
      <Header />
      <About />
      <Works />
      <Skills />
      <Testimonials />
      <Footer />
      <div className="app__footer-fullwidth">
        <p className="p-text">
          @{new Date().getFullYear()} Jay Kapade. All rights reserved.
        </p>
        <p className="p-text">Made with ❤️ in India</p>
      </div>
    </div>
  );
}
