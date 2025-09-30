import { getContract } from 'viem';
import { createPublicClient, http } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import type { Address } from 'viem';
import { baseRpcUrl, baseSepoliaRpcUrl } from '@/lib/web3/config';
import { CHAIN_TESTNET } from '@/lib/constants';
import { megapotV2Abi } from './abi';

// Contract addresses
const MEGAPOT_V2_MAINNET_ADDRESS: Address = '0x0000000000000000000000000000000000000000';
const MEGAPOT_V2_TESTNET_ADDRESS: Address = '0xDF61A9c7d6B35AA2C9eB4F919d46068E24bFAa3C';

const isTestnet = process.env.NEXT_PUBLIC_CHAIN === CHAIN_TESTNET;

const megapotV2Address = isTestnet ? MEGAPOT_V2_TESTNET_ADDRESS : MEGAPOT_V2_MAINNET_ADDRESS;
const megapotV2Chain = isTestnet ? baseSepolia : base;
const rpcUrl = isTestnet ? baseSepoliaRpcUrl : baseRpcUrl;

const publicClient = createPublicClient({
  chain: megapotV2Chain,
  transport: http(rpcUrl),
});

export const megapotV2Contract = getContract({
  address: megapotV2Address,
  abi: megapotV2Abi,
  client: publicClient,
});
