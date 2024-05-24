import Web3, { Contract } from "web3";
import { TransactionError } from "../../ultils";
import { IssueId } from "../../model";
import { ERC20ABI, FundingERC20Addresses, IssueEscrowABI, IssueEscrowAddresses } from "./abi";
import { SupportedNetworks, WalletState } from "../../hooks";

export class OseSDK {
  private web3: Web3;
  private accounts: string[];
  private contract: Contract<any>;
  private fundingCurrencyDecimals: number;

  constructor(web3: Web3, accounts: string[], contract: Contract<any>, fundingCurrencyDecimals: number) {
    this.web3 = web3;
    this.accounts = accounts;
    this.contract = contract;
    this.fundingCurrencyDecimals = fundingCurrencyDecimals;
  }

  static async build(web3: Web3, wallet: WalletState): Promise<OseSDK> {
    // TODO: better error handling
    const contract: Contract<any> = new web3.eth.Contract(IssueEscrowABI.abi as any, IssueEscrowAddresses[wallet.chainId as SupportedNetworks]);
    const erc20Contract = new web3.eth.Contract(ERC20ABI as any, FundingERC20Addresses[wallet.chainId as SupportedNetworks]);
    const tokenDecimals = (await erc20Contract.methods.decimals().call()) as string;
    return new OseSDK(web3, wallet.accounts, contract, parseInt(tokenDecimals));
  }

  async fundIssue(issueId: IssueId, amount: number): Promise<void> {
    try {
      await this.contract.methods.fundIssue(issueId.owner, issueId.repository, issueId.number, this.adjustedAmount(amount, this.fundingCurrencyDecimals)).send({
        from: this.accounts[0],
      });
    } catch (error: any) {
      return Promise.reject(new TransactionError("Error at issue funding : " + error.message));
    }
  }

  async getIssueFundingAmount(issueId: IssueId): Promise<number> {
    const amountCollected: string = await this.contract.methods.getIssueFundingAmount(issueId.owner, issueId.repository, issueId.number).call();
    return parseInt(amountCollected);
  }

  async fetchAllIssueKeys(): Promise<Set<IssueId>> {
    const newIssueKeys = new Set<IssueId>();
    const events = await this.contract.getPastEvents("IssueFunded", {
      fromBlock: 0, // Adjust according to your deployment block
      toBlock: "latest",
    });
    events.forEach(event => {
      // @ts-ignore
      newIssueKeys.add(JSON.parse(event.args));
    });
    return newIssueKeys;
  }

  private adjustedAmount(amount: number, decimals: number) {
    // @ts-ignore
    return this.web3.utils.toBN(amount).mul(this.web3.utils.toBN(10 ** decimals));
  }
}
