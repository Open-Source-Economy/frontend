import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { getFirstSentenceOrFirstNWordsFromValue } from "../../functions";
import { ChartData } from "../../model";
import { data } from "./ChartData";

interface CardProps {
  name: string;
  tokenCode: string;
  tagline: string;
  quoteCurrency: string;
  logo: string;
}

const Card: React.FC<CardProps> = props => {
  const [chartData, setChartData] = useState<ChartData>(new ChartData([]));

  useEffect(() => {
    setChartData(data(props.name));
  }, []);

  return (
    <>
      <div className="card__project">
        <div className="card__head pt-3 pb-4 px-md-4">
          <div className="row mx-0 align-items-center flex-md-row gap-lg-0 gap-3">
            <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
              <div className="d-flex gap-4 align-items-center">
                <img src={props.logo} className="brandimg" alt="" />
                <div>
                  <h5 className="helvetica text-white fw-700">
                    {props.name} <span className="text-uppercase fs-6"> ({props.tokenCode})</span>
                  </h5>
                  <p className="text-white helvetica mb-0">{getFirstSentenceOrFirstNWordsFromValue(props.tagline, 10)}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
              <div className="text-start">
                {/* TODO: refactor this BannerSwap */}
                <h5 className="mb-2 text-white helvetica">{chartData.price && ` ${props.quoteCurrency} ${chartData.price.toFixed(2)} `}</h5>
                {chartData.changeValue &&
                  (chartData.changeValue! < 0 ? (
                    <h5 className=" mb-0 fw-500 text__red helvetica">▼ {chartData.changeValue.toFixed(2)}%</h5>
                  ) : (
                    <h5 className=" mb-0 fw-500 text__green helvetica">▲ +{chartData.changeValue.toFixed(2)}%</h5>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="chartheight">
          <Chart chatData={chartData.points} />
        </div>
      </div>
    </>
  );
};

export default Card;
