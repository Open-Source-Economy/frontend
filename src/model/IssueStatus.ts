// TODO: lolo to clean
export abstract class IssueStatus {
  amountCollected: number;
  currencySymbol: string = "€";
  currencyLogo: string = "https://cryptologos.cc/logos/solana-sol-logo.png?v=029"; //

  constructor(amountCollected: number) {
    this.amountCollected = amountCollected;
  }
}

export class CollectApproved extends IssueStatus {
  goalAmount: number;

  constructor(amountCollected: number, goalAmount: number) {
    super(amountCollected);
    this.goalAmount = goalAmount;
  }
}

export class CollectToBeApproved extends IssueStatus {}

export class Closed extends IssueStatus {
  goalAmount?: number;

  constructor(amountCollected: number, goalAmount?: number) {
    super(amountCollected);
    this.goalAmount = goalAmount;
  }
}
