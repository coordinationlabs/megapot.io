import { createConfig, http } from "wagmi";
import { base, baseSepolia } from "viem/chains";

export const baseRpcUrl = `https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY!}`;
export const baseSepoliaRpcUrl = `https://base-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY!}`;

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

export const defaultConfig = baseConfig;
