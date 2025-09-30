import { base, baseSepolia } from 'viem/chains';

export const supportedChains = [base, baseSepolia] as const;

export type SupportedChain = typeof supportedChains[number];
