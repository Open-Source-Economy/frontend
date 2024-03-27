import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { ChartDataPoint } from "../../../../model";

interface ChartProps {
  chartData: ChartDataPoint[];
}

export function Chart({ chartData }: ChartProps) {
  return (
    <div className="overflow-hidden" style={{ width: "100%", height: "100%", borderRadius: "20px", backgroundColor: "#132743" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={chartData}
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
}
