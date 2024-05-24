import {SupportedNetworks} from "../../../hooks";

export const ERC20ABI = require("./ERC20ABI.json");
export const IssueEscrowABI = require("./IssueEscrowABI.json");

export const FundingERC20Addresses = {
    [SupportedNetworks.Arbitrum]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [SupportedNetworks.Arbitrum_Sepolia_Testnet]: "0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E"
};

export const IssueEscrowAddresses = {
    [SupportedNetworks.Arbitrum]: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    [SupportedNetworks.Arbitrum_Sepolia_Testnet]: "0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E"
};


