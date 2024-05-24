import { WalletState } from "./useMetaMask";

export enum SupportedNetworks {
  Arbitrum = "Arbitrum",
  Arbitrum_Sepolia_Testnet = "Arbitrum Sepolia (Testnet)",
}

export function isChainSupported(wallet: WalletState): boolean {
  return allSupportedChainIds.includes(wallet.chainId.toString());
}

export interface NetworkConfig {
  [key: string]: {
    chainId: string;
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string;
      decimals: number;
    };
    rpcUrls: string[];
    blockExplorerUrls: string[];
  };
}

export const networks: NetworkConfig = {
  [SupportedNetworks.Arbitrum]: {
    chainId: `0x${Number(42161).toString(16)}`,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "AETH",
      symbol: "AETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  [SupportedNetworks.Arbitrum_Sepolia_Testnet]: {
    chainId: `0x${Number(421614).toString(16)}`,
    chainName: "Arbitrum Sepolia (Testnet)",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://sepolia.arbiscan.io"],
  },
};

// Function to get an object mapping each network to its chainId
function getAllSupportedChainIds(): string[] {
  const chainIds: string[] = [];
  for (const network in networks) {
    if (Object.values(SupportedNetworks).includes(network as SupportedNetworks)) {
      chainIds.push(networks[network as SupportedNetworks].chainId);
    }
  }
  return chainIds;
}

const allSupportedChainIds: string[] = getAllSupportedChainIds();
