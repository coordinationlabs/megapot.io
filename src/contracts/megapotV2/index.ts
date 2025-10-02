import { megapotV2Abi } from "@/contracts/megapotV2/abi";
import { defaultRpcUrl, isTestnet } from "@/lib/web3/config";
import { Contract, JsonRpcProvider, Signer } from "ethers";

export type { DrawingState } from "@/contracts/megapotV2/types";

// Contract addresses
const MEGAPOT_V2_MAINNET_ADDRESS: string =
  "0x0000000000000000000000000000000000000000";
const MEGAPOT_V2_TESTNET_ADDRESS: string =
  "0xDF61A9c7d6B35AA2C9eB4F919d46068E24bFAa3C";

const megapotV2Address = isTestnet()
  ? MEGAPOT_V2_TESTNET_ADDRESS
  : MEGAPOT_V2_MAINNET_ADDRESS;
const rpcUrl = defaultRpcUrl();

let provider: JsonRpcProvider | undefined;
let contract: Contract | undefined;

export function getMegapotV2Contract(): Contract {
  if (!provider) {
    provider = new JsonRpcProvider(rpcUrl);
  }
  if (!contract) {
    contract = new Contract(megapotV2Address, megapotV2Abi, provider);
  }
  return contract;
}

export function getMegapotV2WriteContract(signer: Signer): Contract {
  return new Contract(megapotV2Address, megapotV2Abi, signer);
}
