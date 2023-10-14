import * as React from "react";
import Header from "../components/Layout/Header";
import BannerSwap from "../components/Swap/BannerSwap";
import SwapChart2 from "../components/Donate/SwapChart2";
import Footer from "../components/Layout/Footer";

const Donate = () => {
  return (
    <>
      <Header isLogged={true} />
      <BannerSwap />
      <SwapChart2 />
      <div className="mt-5 pt-lg-5"></div>
      <Footer />
    </>
  );
};

export default Donate;
