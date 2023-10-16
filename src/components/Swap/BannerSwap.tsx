import * as React from "react";
import { getFirstSentenceOrFirstNWordsFromValue } from "../../functions";
import { ChartData, ValidRepository } from "../../model";

interface BannerSwapProps {
  project: ValidRepository;
  chartData: ChartData;
  quoteCurrency: string;
  logo: string;
}

const BannerSwap: React.FC<BannerSwapProps> = props => {
  return (
    <>
      <div className="container">
        <div className="row mx-0 justify-content-center pt-5  mt-3 mt-lg-5">
          <div className="col-lg-7">
            <div className="row mx-0 align-items-center gap-lg-0 gap-3 flex-md-row flex-column">
              <div className=" col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
                <div className="d-flex gap-4 align-items-center">
                  <img src={props.logo} className="brandimg" alt="" />
                  <div>
                    <h5 className="helvetica text-white fw-700">
                      {props.project.githubData.full_name} <span className="text-uppercase fs-6"> ({props.project.tokenCode})</span>
                    </h5>
                    <p className="text-white helvetica mb-0">{getFirstSentenceOrFirstNWordsFromValue(props.project.githubData.description, 10)}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
                {/* TODO: refactor this Card */}
                <div className="text-lg-end text-start">
                  <h5 className="mb-2 text-white helvetica">{props.chartData.price && ` ${props.quoteCurrency} ${props.chartData.price.toFixed(2)} `}</h5>
                  {props.chartData.changeValue &&
                    (props.chartData.changeValue! < 0 ? (
                      <h5 className=" mb-0 fw-500 text__red helvetica">
                        ▼ -{props.chartData.changeValue.toFixed(2)}% <span className="text-white">(Week)</span>{" "}
                      </h5>
                    ) : (
                      <h5 className=" mb-0 fw-500 text__green helvetica">▲ +{props.chartData.changeValue.toFixed(2)}%</h5>
                    ))}
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
