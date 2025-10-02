import { scaledEntropyProviderAbi } from "@/contracts/scaledEntropyProvider/abi";
import { defaultRpcUrl, isTestnet } from "@/lib/web3/config";
import { Contract, JsonRpcProvider } from "ethers";

// Contract addresses
const MAINNET_ADDRESS: string = "0x0000000000000000000000000000000000000000";
const TESTNET_ADDRESS: string = "0x79abA78e34F6B2ce138dBF88ef20C1571f47B1fC";

const scaledEntropyProviderAddress = isTestnet()
  ? TESTNET_ADDRESS
  : MAINNET_ADDRESS;
const rpcUrl = defaultRpcUrl();

let provider: JsonRpcProvider | undefined;
let contract: Contract | undefined;

export function getScaledEntropyProviderContract(): Contract {
  if (!provider) {
    provider = new JsonRpcProvider(rpcUrl);
  }
  if (!contract) {
    contract = new Contract(
      scaledEntropyProviderAddress,
      scaledEntropyProviderAbi,
      provider
    );
  }
  return contract;
}
