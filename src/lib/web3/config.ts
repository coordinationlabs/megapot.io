import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "viem/chains";

// RPC URLs - using Alchemy as main RPC provider
const alchemyApiKey = process.env.ALCHEMY_API_KEY || "";
export const baseRpcUrl = alchemyApiKey
  ? `https://base-mainnet.g.alchemy.com/v2/${alchemyApiKey}`
  : "https://mainnet.base.org";
export const baseSepoliaRpcUrl = alchemyApiKey
  ? `https://base-sepolia.g.alchemy.com/v2/${alchemyApiKey}`
  : "https://sepolia.base.org";

export const baseConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(baseRpcUrl),
  },
});

export const testnetConfig = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(baseSepoliaRpcUrl),
  },
});

// Default config (change based on your primary network)
export const defaultConfig = baseConfig;
