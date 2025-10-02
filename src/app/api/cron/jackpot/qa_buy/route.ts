import {
  getMegapotV2Contract,
  getMegapotV2WriteContract,
} from "@/contracts/megapotV2";
import { DrawingState, Ticket } from "@/contracts/megapotV2/types";
import { getUsdcWriteContract } from "@/contracts/usdc";
import { defaultRpcUrl } from "@/lib/web3/config";
import { JsonRpcProvider, Wallet } from "ethers";
import { verifyCronAuthHeader } from "@/lib/utils/cronAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = verifyCronAuthHeader(request);
  if (unauthorized) return unauthorized;

  try {
    const rpcUrl = defaultRpcUrl();
    const provider = new JsonRpcProvider(rpcUrl);
    const keeper = new Wallet(process.env.MEGAPOT_KEEPER_PK!, provider);

    const readMegapot = getMegapotV2Contract();
    const writeMegapot = getMegapotV2WriteContract(keeper);
    const usdcContract = getUsdcWriteContract(keeper);

    const drawingId = await readMegapot.currentDrawingId();
    const state: DrawingState = (await readMegapot.getDrawingState(
      drawingId
    )) as DrawingState;

    // Use valid numbers within the ballMax and powerballMax ranges
    const ballMax = Number(state.ballMax);
    const powerballMax = Number(state.powerballMax);

    const tickets: Ticket[] = [
      {
        normals: [1, 2, 3, 4, 5].map(n => Math.min(n, ballMax)),
        powerball: Math.min(1, powerballMax),
      },
    ];

    const totalCost = state.ticketPrice * BigInt(tickets.length);

    const currentAllowance = await usdcContract.allowance(
      keeper.address,
      writeMegapot.target
    );

    // Approve USDC spending if needed
    if (currentAllowance < totalCost) {
      const approveTx = await usdcContract.approve(
        writeMegapot.target,
        totalCost
      );
      await approveTx.wait();
    }

    const tx = await writeMegapot.buyTickets(
      tickets,
      keeper.address,
      [],
      [],
      "0x0000000000000000000000000000000000000000000000000000000000000000"
    );

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
