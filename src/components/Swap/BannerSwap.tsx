import * as React from "react";
import xmoney from "../../assets/images/xmon.png";

const BannerSwap = () => {
  return (
    <>
      <div className="container">
        <div className="row mx-0 justify-content-center pt-5  mt-3 mt-lg-5">
          <div className="col-lg-7">
            <div className="row mx-0 align-items-center gap-lg-0 gap-3 flex-md-row flex-column">
              <div className=" col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
                <div className="d-flex gap-4 align-items-center">
                  <img src={xmoney} className="brandimg" alt="" />
                  <div>
                    <h5 className="helvetica text-white fw-700">
                      xMoney <span className="text-uppercase fs-6"> UTK</span>
                    </h5>
                    <p className="text-white helvetica mb-0">The solution to make Open-Source as Competitive as Closed Source.</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
                <div className="text-lg-end text-start">
                  <h5 className="mb-2 text-white helvetica"> $0.05227 </h5>
                  <h5 className=" mb-0 fw-500 text__red helvetica">
                    ▼-4.17 <span className="text-white">(Week)</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerSwap;
