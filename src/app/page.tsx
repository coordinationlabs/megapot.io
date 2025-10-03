import { jackpotService } from "@/lib/services/jackpot";
import { formatDrawingTime, formatUSDC } from "@/lib/utils/stringUtils";

export default async function Home() {
  const state = await jackpotService.getCurrentDrawingState();

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center flex flex-col gap-6">
        <div className="text-2xl font-semibold">Megapot V2</div>

        <div className="text-lg">Jackpot: ${formatUSDC(state.prizePool)}</div>
        <div className="text-lg">
          Tickets purchased: {state.globalTicketsBought.toString()}
        </div>
        <div className="text-lg">
          Drawing time: {formatDrawingTime(state.drawingTime)}
        </div>
      </div>
    </main>
  );
}
