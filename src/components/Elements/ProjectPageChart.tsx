import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { ChartData, ChartPointData } from "../../model";
import { data } from "./ChartData";
import { ProjectContext } from "../../routes/pages/swap/Swap";

// chart data -----
const twentyFourHoursData = [
  { days: "Mon 12", timestamp: "2023-10-12T00:00:00", price: 2000 },
  { days: "Tue 13", timestamp: "2023-10-12T04:00:00", price: 5000 },
  { days: "Wed 19", timestamp: "2023-10-12T03:00:00", price: 4000 },
  { days: "Thu 20", timestamp: "2023-10-12T02:00:00", price: 3000 },
  { days: "Fri 13", timestamp: "2023-10-12T01:00:00", price: 7000 },
  { days: "Sat 13", timestamp: "2023-10-12T01:00:00", price: 7000 },
  { days: "Sun 13", timestamp: "2023-10-12T01:00:00", price: 7000 },
];
const oneWeakData = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 1000 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 2000 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 2400 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 3000 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 4000 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 7200 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 7000 },
];

const lastMonthData = [
  { days: "Mon 13", timestamp: "2023-10-10T00:00:00", price: 1000 },
  { days: "Tue 13", timestamp: "2023-10-10T00:00:00", price: 1500 },
  { days: "Wed 23", timestamp: "2023-10-11T00:00:00", price: 2000 },
  { days: "Thu 13", timestamp: "2023-10-10T00:00:00", price: 1500 },
  { days: "Fri 19", timestamp: "2023-10-12T00:00:00", price: 3000 },
  { days: "Sat 13", timestamp: "2023-10-10T00:00:00", price: 4000 },
  { days: "Sun 17", timestamp: "2023-10-10T00:00:00", price: 5000 },
];
const oneYearAgoData = [
  { days: "Mon 13", timestamp: "2022-10-10T00:00:00", price: 300 },
  { days: "Tue 19", timestamp: "2022-10-12T00:00:00", price: 2000 },
  { days: "Wed 23", timestamp: "2022-10-11T00:00:00", price: 6000 },
  { days: "Thu 17", timestamp: "2022-10-10T00:00:00", price: 9000 },
  { days: "Fri 13", timestamp: "2022-10-10T00:00:00", price: 5000 },
  { days: "Sat 13", timestamp: "2022-10-10T00:00:00", price: 6000 },
  { days: "Sun 13", timestamp: "2022-10-10T00:00:00", price: 7000 },
];

const allData = [
  { timestamp: "2022-10-10T00:00:00", price: 300 },
  { days: "2021", timestamp: "2023-10-10T00:00:00", price: 1000 },
  { timestamp: "2023-10-12T04:00:00", price: 1000 },
  { timestamp: "2023-10-10T00:00:00", price: 1500 },
  { timestamp: "2023-10-10T00:00:00", price: 1500 },
  { timestamp: "2022-10-12T00:00:00", price: 2000 },
  { timestamp: "2023-10-11T00:00:00", price: 2000 },
  { timestamp: "2023-10-12T03:00:00", price: 2000 },
  { timestamp: "2023-10-12T00:00:00", price: 2000 },
  { timestamp: "2023-10-12T00:00:00", price: 2400 },
  { timestamp: "2023-10-12T00:00:00", price: 3000 },
  { timestamp: "2023-10-12T02:00:00", price: 3000 },
  { timestamp: "2023-10-12T02:00:00", price: 3000 },
  { timestamp: "2023-10-12T00:00:00", price: 4000 },
  { timestamp: "2023-10-10T00:00:00", price: 4000 },
  { timestamp: "2023-10-12T03:00:00", price: 4000 },
  { timestamp: "2022-10-10T00:00:00", price: 5000 },
  { timestamp: "2023-10-10T00:00:00", price: 5000 },
  { timestamp: "2023-10-12T04:00:00", price: 5000 },
  { timestamp: "2022-10-11T00:00:00", price: 6000 },
  { timestamp: "2022-10-10T00:00:00", price: 6000 },
  { timestamp: "2023-10-12T00:00:00", price: 7000 },
  { timestamp: "2022-10-10T00:00:00", price: 7000 },
  { timestamp: "2023-10-12T01:00:00", price: 7000 },
  { timestamp: "2023-10-12T01:00:00", price: 7000 },
  { timestamp: "2023-10-12T01:00:00", price: 7000 },
  { timestamp: "2022-10-10T00:00:00", price: 9000 },
];

const ProjectPageChart = () => {
  const [click, setClick] = useState("24h");
  const [minnPrice, setMinPrice] = useState(0);
  const [maxxPrice, setMixPrice] = useState(100);
  const [active, setActive] = useState("tab-1");
  const [filteredData, setFilteredData] = useState<ChartData>(new ChartData([]));

  const project = useContext(ProjectContext);

  useEffect(() => {
    const minPrice = Math.min(...allData.map((item: any) => item.price));
    const maxPrice = Math.max(...allData.map((item: any) => item.price));
  }, []);

  useEffect(() => {
    if (click === "24h") {
      setFilteredData(data(project!.githubData.full_name));
    } else if (click === "1W") {
      setFilteredData(new ChartData(oneWeakData));
    } else if (click === "1M") {
      setFilteredData(new ChartData(lastMonthData));
    } else {
      setFilteredData(new ChartData(oneYearAgoData));
    }

    const prices: number[] = filteredData.points.map((item: ChartPointData) => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    setMinPrice(minPrice);
    setMixPrice(maxPrice);
  }, [click]);

  // TODO: lolo
  // if (filteredData) {
  //     useEffect(() => {
  //         const minPrice = Math.min(...filteredData.map((item: any) => item.price));
  //         const maxPrice = Math.max(...filteredData.map((item: any) => item.price));
  //
  //         setMinPrice(minPrice)
  //         setMixPrice(maxPrice)
  //
  //     }, [filteredData]);
  // }
  // else {
  //
  //     filteredData = allData;
  //     useEffect(() => {
  //         const minPrice = Math.min(...allData.map((item: any) => item.price));
  //         const maxPrice = Math.max(...allData.map((item: any) => item.price));
  //
  //         setMinPrice(minPrice)
  //         setMixPrice(maxPrice)
  //
  //     }, [allData]);
  //
  // }

  return (
    <div className=" relative p-[0] pr-6 ssm:p-[1rem] sm:p-[2rem] flex-col lg:flex-row  flex gap-4 justify-between ">
      <div className="overflow-hidden pt-lg-5 mt-lg-5" style={{ width: "100%", height: "500px" }}>
        {/* -------- Buttons ---  */}
        <div className="flex relative sm:absolute top-0 mx-auto w-full left-[50px] xsm:left-[100px] sm:left-[130px] lg:left-[120px] xl:left-[136px] gap-[1rem] sm:gap-[3rem] md:gap-[5rem] xl:gap-[7rem] items-start">
          {/* <button onClick={() => setClick("24h")} className={`${click == "24h" ? "bg-[#FF5E1A]" : ""} px-[10px] text-[13px] xsm:text-[16px] rounded-[10px] py-1 text-white font-normal  font-mono`}>24h</button> */}
          {/* <button onClick={() => setClick("1W")} className={`${click == "1W" ? "bg-[#FF5E1A]" : ""} px-[10px] text-[13px] xsm:text-[16px] rounded-[10px] py-1 text-white font-normal  font-mono`}>1W</button>
                    <button onClick={() => setClick("1M")} className={`${click == "1M" ? "bg-[#FF5E1A]" : ""} px-[10px] text-[13px] xsm:text-[16px] rounded-[10px] py-1 text-white font-normal  font-mono`}>1M</button>
                    <button onClick={() => setClick("1Y")} className={`${click == "1Y" ? "bg-[#FF5E1A]" : ""} px-[10px] text-[13px] xsm:text-[16px] rounded-[10px] py-1 text-white font-normal  font-mono`}>1Y</button>
                    <button onClick={() => setClick("All")} className={`${click == "All" ? "bg-[#FF5E1A]" : ""} px-[10px] text-[13px] xsm:text-[16px] rounded-[10px] py-1 text-white font-normal  font-mono`}>All</button> */}
        </div>
        <div className="tabs ">
          <button
            className={active == "tab-1" ? "active" : "tab"}
            onClick={() => {
              setActive("tab-1");
              setClick("24h");
            }}
          >
            24h
          </button>
          <button
            className={active == "tab-2" ? "active" : "tab"}
            onClick={() => {
              setActive("tab-2");
              setClick("1W");
            }}
          >
            1W
          </button>
          <button
            className={active == "tab-3" ? "active" : "tab"}
            onClick={() => {
              setActive("tab-3");
              setClick("1M");
            }}
          >
            1M
          </button>
          <button
            className={active == "tab-4" ? "active" : "tab"}
            onClick={() => {
              setActive("tab-4");
              setClick("1Y");
            }}
          >
            1Y
          </button>
          <button
            className={active == "tab-5" ? "active" : "tab"}
            onClick={() => {
              setActive("tab-5");
              setClick("All");
            }}
          >
            All
          </button>
        </div>

        <ResponsiveContainer width="100%" className="transformscale" height="67%">
          <AreaChart
            width={500}
            height={400}
            data={filteredData.points}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <XAxis
              interval={0}
              axisLine={false}
              xAxisId="0"
              stroke="#9fa5ae"
              dataKey="days"
              className="font-normal font-mono text-[8px] ssm:text-[10px] xsm:-[14px] sm:text-[16px]"
            />
            <YAxis
              axisLine={false}
              includeHidden
              domain={[minnPrice, maxxPrice]}
              stroke="#9fa5ae"
              className="  font-normal no-underline font-mono text-[8px] ssm:text-[10px] xsm:-[14px] sm:text-[16px]"
            />
            <CartesianGrid opacity={0.1} />
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
              labelStyle={{ display: "none", color: "#222" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* <div className="bg-[#132743] rounded-[20px]  w-full lg:w-[540px] h-[400px]">
                data
            </div> */}
    </div>
  );
};

export default ProjectPageChart;
