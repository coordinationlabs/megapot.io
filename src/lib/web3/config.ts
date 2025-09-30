import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "viem/chains";

// RPC URLs - using Alchemy as main RPC provider
export const baseRpcUrl = `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
export const baseSepoliaRpcUrl = `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

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
