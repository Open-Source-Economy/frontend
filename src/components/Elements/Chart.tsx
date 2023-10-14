import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useEffect, useState } from "react";
import data from "./ChartData";

type propsType = {
  imgd: string;
  title: string;
  smTitle: string;
  desc: string;
  price: number;
  profitPrice: number;
  chatData: any; // chat data come with props
};

const Chart = ({ imgd, title, smTitle, desc, price, profitPrice, chatData }: propsType) => {
  const [grapData, setGraphData] = useState([]);

  function filterDataForLastWeek(data: any): any {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return data.filter((item: any) => {
      return new Date(item.timestamp) >= oneWeekAgo;
    });
  }

  useEffect(() => {
    setGraphData(filterDataForLastWeek(data));
  }, [chatData]);
  return (
    <div className="overflow-hidden" style={{ width: "100%", height: "100%", borderRadius: "20px", backgroundColor: "#132743" }}>
      {/* --- upper details   */}
      <div className="flex py-3 px-3 justify-between items-center my-1 mb-3 d-none">
        {/* --left  */}
        <div className="flex gap-2 w-[70%]">
          <img className=" w-[34px] xsm:w-[42px] sm:w-[52px] h-[35px]  xsm:h-[45px] sm:h-[57px]" src={imgd} alt={imgd} />
          <div>
            <p className=" text-[16px] ssm:text-[18px] xsm:text-[22px] sm:text-[24px] font-mono font-bold text-color-main">
              {title}
              <span className="text-[18px] font-medium ml-1 uppercase">{smTitle}</span>
            </p>
            <p className="text-[#ffffff88] text-[8px] xsm:text-[12px] sm:text-[15px] font-normal font-mono">{desc}</p>
          </div>
        </div>
        {/* --Right  */}
        <div>
          <p className="text-color-main text-[14px] xsm:text-[18px] sm:text-[20px] font-normal font-mono">${price}</p>
          <p className={` ${profitPrice > 0 ? "text-[#40BF6A]" : "text-[#DF2040]"} text-[14px] sm:text-[18px] font-mono font-normal`}>
            {profitPrice < 0 ? <AiOutlineArrowDown className="inline-block" /> : <AiOutlineArrowUp className="inline-block" />} {profitPrice}%
          </p>
          <span className="text-[18px] text-[#ffffff88] font-mono font-medium ml-1 uppercase">1W</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={grapData}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="chartColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8c422c" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8c422c" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area animationDuration={0} isAnimationActive={false} type="monotone" dataKey="price" stroke="#ff5e1a" fillOpacity={1} fill="url(#chartColor)" />
          <Tooltip
            contentStyle={{
              background: "transparent",
              fontFamily: "monospace",
              fontSize: "16px",
              fontWeight: "300",
              borderRadius: "10px",
            }}
            labelStyle={{ display: "none" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
