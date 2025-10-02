import { getMegapotV2Contract, DrawingState } from "@/contracts/megapotV2";
import { formatUSDC, formatDrawingTime } from "@/lib/utils/stringUtils";

export default async function Home() {
  const contract = getMegapotV2Contract();
  const drawingId = await contract.currentDrawingId();
  const state = (await contract.getDrawingState(drawingId)) as DrawingState;

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center flex flex-col gap-6">
        <div className="text-2xl font-semibold">Megapot V2</div>

        <div className="text-lg">Jackpot: ${formatUSDC(state.prizePool)}</div>
        <div className="text-lg">
          Drawing time: {formatDrawingTime(state.drawingTime)}
        </div>
      </div>
    </main>
  );
}
