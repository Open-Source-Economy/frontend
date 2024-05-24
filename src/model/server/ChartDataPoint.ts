export type ChartDataPoint = {
  days: string;
  timestamp: Date;
  price: number;
};

export class ChartData {
  points: ChartDataPoint[];
  quoteCurrency: string;
  price: number | null;
  priceChange: number | null;

  constructor(points: ChartDataPoint[], quoteCurrency: string) {
    this.points = points;
    this.price = ChartData.getPrice(points);
    this.quoteCurrency = quoteCurrency;
    this.priceChange = ChartData.getPriceChange(points);
  }

  public getChartDataAfterTimestamp(timestamp: Date): ChartData {
    return new ChartData(
      this.points.filter((item: any) => {
        return new item.timestamp() >= timestamp;
      }),
      this.quoteCurrency,
    );
  }

  private static getPrice(points: ChartDataPoint[]): number | null {
    return points.length > 0 ? points[points.length - 1].price : null;
  }

  private static getPriceChange(points: ChartDataPoint[]): number | null {
    return points.length > 1 ? ((points[points.length - 1].price - points[0].price) / points[0].price) * 100 : null;
  }
}
