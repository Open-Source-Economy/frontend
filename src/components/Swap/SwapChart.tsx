import * as React from "react";
import TabChart from "./TabChart";
import SwapComp from "./SwapComp";

const SwapChart = () => {
  return (
    <>
      <section className="swapchart">
        <div className="container mt-5 pt-lg-5 pt-3">
          <div className="row mx-0 align-items-center gap-lg-0 gap-0">
            <div className="col-lg-6">
              <TabChart />
            </div>
            <div className="col-lg-6">
              <SwapComp />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SwapChart;
