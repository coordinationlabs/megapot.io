import { getMegapotV2WriteContract } from "@/contracts/megapotV2";
import { Ticket } from "@/contracts/megapotV2/types";
import { getUsdcWriteContract } from "@/contracts/usdc";
import { jackpotService } from "@/lib/services/jackpot";
import { verifyCronAuthHeader } from "@/lib/utils/cronAuth";
import { defaultRpcUrl } from "@/lib/web3/config";
import { JsonRpcProvider, Wallet } from "ethers";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const unauthorized = verifyCronAuthHeader(request);
  if (unauthorized) return unauthorized;

  try {
    const rpcUrl = defaultRpcUrl();
    const provider = new JsonRpcProvider(rpcUrl);
    const keeper = new Wallet(process.env.MEGAPOT_KEEPER_PK!, provider);

    const writeMegapot = getMegapotV2WriteContract(keeper);
    const usdcContract = getUsdcWriteContract(keeper);

    const drawingState = await jackpotService.getCurrentDrawingState();

    // Use valid numbers within the ballMax and powerballMax ranges
    const ballMax = Number(drawingState.ballMax);
    const powerballMax = Number(drawingState.powerballMax);

    const tickets: Ticket[] = [
      {
        normals: [1, 2, 3, 4, 5].map(n => Math.min(n, ballMax)),
        powerball: Math.min(1, powerballMax),
      },
    ];

    const totalCost = drawingState.ticketPrice * BigInt(tickets.length);

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
