import { usdcAbi } from "@/contracts/usdc/abi";
import { defaultRpcUrl, isTestnet } from "@/lib/web3/config";
import { Contract, JsonRpcProvider, Signer } from "ethers";

// Contract addresses
const MAINNET_ADDRESS: string = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const TESTNET_ADDRESS: string = "0xD1Af44EfaD81A74E1D113b354701D4D81A3847ad";

const usdcAddress = isTestnet() ? TESTNET_ADDRESS : MAINNET_ADDRESS;
const rpcUrl = defaultRpcUrl();

let provider: JsonRpcProvider | undefined;
let contract: Contract | undefined;

export function getUsdcContract(): Contract {
  if (!provider) {
    provider = new JsonRpcProvider(rpcUrl);
  }
  if (!contract) {
    contract = new Contract(usdcAddress, usdcAbi, provider);
  }
  return contract;
}

export function getUsdcWriteContract(signer: Signer): Contract {
  return new Contract(usdcAddress, usdcAbi, signer);
}
