import { verifyCronAuthHeader } from "@/lib/utils/cronAuth";
import {
  getMegapotV2Contract,
  getMegapotV2WriteContract,
} from "@/contracts/megapotV2";
import { getScaledEntropyProviderContract } from "@/contracts/scaledEntropyProvider";
import { JsonRpcProvider, Wallet, zeroPadValue, randomBytes } from "ethers";
import { defaultRpcUrl } from "@/lib/web3/config";

export async function POST(request: Request) {
  const unauthorized = verifyCronAuthHeader(request);
  if (unauthorized) return unauthorized;

  try {
    const rpcUrl = defaultRpcUrl();
    const provider = new JsonRpcProvider(rpcUrl);

    const privateKey = process.env.CRON_RUNNER_PRIVATE_KEY;
    if (!privateKey) {
      return new Response(
        JSON.stringify({ error: "Missing CRON_RUNNER_PRIVATE_KEY" }),
        { status: 500 }
      );
    }

    const wallet = new Wallet(privateKey, provider);

    const readMegapot = getMegapotV2Contract();
    const writeMegapot = getMegapotV2WriteContract(wallet);
    const entropy = getScaledEntropyProviderContract();

    const drawingId = await readMegapot.currentDrawingId();
    const state = await readMegapot.getDrawingState(drawingId);

    const nowSec = BigInt(Math.floor(Date.now() / 1000));
    if (state.drawingTime > nowSec) {
      return new Response(
        JSON.stringify({ ok: false, reason: "Drawing not due yet" }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        }
      );
    }

    const GAS_LIMIT = 400000;
    const payableAmount = await entropy.getFee(GAS_LIMIT);

    const userRandomNumber = zeroPadValue(randomBytes(32), 32);

    const tx = await writeMegapot.runJackpot(userRandomNumber, {
      value: payableAmount,
    });
    const receipt = await tx.wait();

    return new Response(
      JSON.stringify({
        ok: true,
        txHash: tx.hash,
        status: receipt?.status ?? null,
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error?.message ?? "Unknown error" }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

export const dynamic = "force-dynamic";
