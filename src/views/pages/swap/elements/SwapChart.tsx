import * as React from "react";
import { SwapComp } from "./SwapComp";
import { ProjectPageChart } from "./ProjectPageChart";

interface SwapChartProps {
  reloadAmountCollected: () => void;
}

export const SwapChart: React.FC<SwapChartProps> = props => {
  return (
    <>
      <section className="swapchart">
        <div className="container mt-5 pt-lg-5 pt-3">
          <div className="row mx-0 align-items-center gap-lg-0 gap-0">
            <div className="col-lg-6">
              <div className="d-flex justify-content-center">
                <div className="w-100">
                  <ProjectPageChart />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <SwapComp reloadAmountCollected={props.reloadAmountCollected} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
