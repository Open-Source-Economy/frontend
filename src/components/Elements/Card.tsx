import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import data from "../Elements/ChartData";
import { getFirstSentenceOrFirstNWordsFromValue } from "../../functions";

interface CardProps {
  name: string;
  tokenCode: string;
  tagline: string;
  price: number;
  quoteCurrency: string;
  changeValue: number;
  logo: string;
}

const Card: React.FC<CardProps> = props => {
  const [chartData, setChartData] = useState({}); // i use same data and 4 carts you create 4 state for for diffrent diffrent data example const [chart1Data,setChart1Data] = useState({}) same for more after this

  useEffect(() => {
    setChartData(data); // set the chart data i pass same data and all chart you make exmple 4 cahrt you make 4 state and import data from api and pass here example setChart1Data(YourData)
  }, []);

  return (
    <>
      <div className="card__project">
        <div className="card__head pt-3 pb-4 px-md-4">
          <div className="row mx-0 align-items-center flex-md-row gap-lg-0 gap-3">
            <div className=" col-12 col-sm-9 col-md-9 col-lg-9 col-xl-9 col-xxl-8">
              <div className="d-flex gap-4 align-items-center">
                <img src={props.logo} className="brandimg" alt="" />
                <div>
                  <h5 className="helvetica text-white fw-700">
                    {props.name} <span className="text-uppercase fs-6"> ({props.tokenCode})</span>
                  </h5>
                  {/* TODO: if cut, add "..." */}
                  <p className="text-white helvetica mb-0">{getFirstSentenceOrFirstNWordsFromValue(props.tagline, 10)}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
              <div className="text-start">
                <h5 className="mb-2 text-white helvetica">
                  {" "}
                  {props.quoteCurrency} {props.price}{" "}
                </h5>
                {props.changeValue < 0 ? (
                  <h5 className=" mb-0 fw-500 text__red helvetica">▼ {props.changeValue}</h5>
                ) : (
                  <h5 className=" mb-0 fw-500 text__green helvetica">▲ {props.changeValue}</h5>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <img src={Chartimg} className='w-100' alt="" /> */}
        <div className="chartheight">
          <Chart
            desc={props.tagline}
            chatData={chartData}
            title={props.name}
            smTitle={props.tokenCode}
            imgd={props.logo}
            price={props.price}
            profitPrice={props.changeValue}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
