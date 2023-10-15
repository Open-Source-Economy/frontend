export type ChatPointData = {
  days: string;
  timestamp: string;
  price: number;
};

const data: ChatPointData[] = [
  { days: "Mon 13", timestamp: "2023-10-12T04:00:00", price: 1000 },
  { days: "Tue 13", timestamp: "2023-10-12T03:00:00", price: 2000 },
  { days: "Wed 13", timestamp: "2023-10-12T00:00:00", price: 2400 },
  { days: "Thu 13", timestamp: "2023-10-12T02:00:00", price: 3000 },
  { days: "Fri 13", timestamp: "2023-10-12T00:00:00", price: 4000 },
  { days: "Sat 13", timestamp: "2023-10-12T00:00:00", price: 7200 },
  { days: "Sun 13", timestamp: "2023-10-12T00:00:00", price: 7000 },
];

export default data;
