import { ChartData, ChartPointData } from "../../model";

const data1: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 55 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 50 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 60 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 55 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 61 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 72 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 70 },
];

const data2: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 20 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 15 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 30 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 25 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 26 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 30 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 25 },
];

const data3: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 0.2 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 0.2 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 0.24 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 0.3 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 0.31 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 0.32 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 0.19 },
];

const data4: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 0.1 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 0.12 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 0.13 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 0.14 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 0.13 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 0.12 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 0.11 },
];

const data5: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 0.5 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 0.55 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 0.6 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 0.65 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 0.8 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 0.9 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 0.4 },
];

const data6: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 0.2 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 0.19 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 0.18 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 0.17 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 0.16 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 0.15 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 0.16 },
];

const data7: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 0.25 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 0.26 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 0.25 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 0.29 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 0.28 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 0.25 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 0.26 },
];

const data8: ChartPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 10 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 15 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 20 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 25 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 26 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 27 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 25 },
];

//  string to deterministic number
function sdbm(str: string): number {
  let arr = str.split("");
  return arr.reduce((hashCode, currentVal) => (hashCode = currentVal.charCodeAt(0) + (hashCode << 6) + (hashCode << 16) - hashCode), 0);
}

export function data(fullName: string): ChartData {
  const all: ChartPointData[][] = [data1, data2, data3, data4, data5, data6, data7, data8];
  const index = Math.abs(sdbm(fullName)) % all.length;
  return new ChartData(all[index]);
}
