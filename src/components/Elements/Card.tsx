import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import data from "../Elements/ChartData";
import xMoneyImg from "../../assets/images/xmon.png";

interface CardProps {
  brand: string;
  caps: string;
  tagline: string;
  marketvalue: string;
  decreasevalue: string;
  increasevalue: string;
  brandimg: string;
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
                <img src={props.brandimg} className="brandimg" alt="" />
                <div>
                  <h5 className="helvetica text-white fw-700">
                    {props.brand} <span className="text-uppercase fs-6"> {props.caps}</span>
                  </h5>
                  <p className="text-white helvetica mb-0">{props.tagline}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3 col-xxl-4">
              <div className="text-start">
                <h5 className="mb-2 text-white helvetica"> {props.marketvalue} </h5>
                {props.decreasevalue ? (
                  <h5 className=" mb-0 fw-500 text__red helvetica">▼{props.decreasevalue}</h5>
                ) : (
                  <h5 className=" mb-0 fw-500 text__green helvetica">▲{props.increasevalue}</h5>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <img src={Chartimg} className='w-100' alt="" /> */}
        <div className="chartheight">
          <Chart
            desc="The solution to make Open-Source as Competitive as Closed Source"
            chatData={chartData}
            title="xMoney"
            smTitle="UTK"
            imgd={xMoneyImg}
            price={0.5227}
            profitPrice={-4.17}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
