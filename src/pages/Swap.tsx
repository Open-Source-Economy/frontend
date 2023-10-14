import * as React from "react";
import Header from "../components/Layout/Header";
import BannerSwap from "../components/Swap/BannerSwap";
import SwapChart from "../components/Swap/SwapChart";
import Footer from "../components/Layout/Footer";

const Swap = () => {
  return (
    <>
      <Header isLogged={true} />
      <BannerSwap />
      <SwapChart />
      <div className="mt-5 pt-lg-5"></div>
      <Footer />
    </>
  );
};

export default Swap;
