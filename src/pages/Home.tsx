import * as React from "react";
import Header from "../components/Layout/Header";
import Banner from "../components/Home/Banner";
import Projects from "../components/Home/Projects";
import Footer from "../components/Layout/Footer";

const Home = () => {
  return (
    <>
      <Header isLogged={false} />
      <Banner />
      <Projects />
      <div style={{ height: "150px" }}></div>
      <Footer />
    </>
  );
};

export default Home;
