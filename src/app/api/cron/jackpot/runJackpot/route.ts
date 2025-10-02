import {
  getMegapotV2Contract,
  getMegapotV2WriteContract,
} from "@/contracts/megapotV2";
import { DrawingState } from "@/contracts/megapotV2/types";
import { getScaledEntropyProviderContract } from "@/contracts/scaledEntropyProvider";
import { defaultRpcUrl } from "@/lib/web3/config";
import { JsonRpcProvider, randomBytes, Wallet, zeroPadValue } from "ethers";

export const dynamic = "force-dynamic";

const GAS_LIMIT = 5_000_000;

export async function GET(request: Request) {
  // const unauthorized = verifyCronAuthHeader(request);
  // if (unauthorized) return unauthorized;

  try {
    const rpcUrl = defaultRpcUrl();
    const provider = new JsonRpcProvider(rpcUrl);
    const keeper = new Wallet(process.env.MEGAPOT_KEEPER_PK!, provider);

    const readMegapot = getMegapotV2Contract();
    const writeMegapot = getMegapotV2WriteContract(keeper);
    const entropy = getScaledEntropyProviderContract();

    const drawingId = await readMegapot.currentDrawingId();
    const state: DrawingState = (await readMegapot.getDrawingState(
      drawingId
    )) as DrawingState;

    const nowSec = BigInt(Math.floor(Date.now() / 1000));

    if (state.drawingTime > nowSec) {
      return new Response(
        JSON.stringify({
          ok: false,
          reason: "Drawing not due yet",
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const payableAmount = await entropy.getFee(GAS_LIMIT);
    const userRandomNumber = zeroPadValue(randomBytes(32), 32);

    const tx = await writeMegapot.runJackpot(userRandomNumber, {
      value: payableAmount,
    });

    await tx.wait();

    return new Response(null, { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error?.message ?? "Unknown error",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
