export type ChartPointData = {
  days: string;
  timestamp: string;
  price: number;
};

export class ChartData {
  points: ChartPointData[];
  price: number | null;
  changeValue: number | null;

  constructor(points: ChartPointData[]) {
    this.points = points;
    this.price = ChartData.getPrice(points);
    this.changeValue = ChartData.getChangeValue(points);
  }

  private static getPrice(points: ChartPointData[]): number | null {
    return points.length > 0 ? points[points.length - 1].price : null;
  }

  private static getChangeValue(points: ChartPointData[]): number | null {
    return points.length > 1 ? ((points[points.length - 1].price - points[0].price) / points[0].price) * 100 : null;
  }
}
