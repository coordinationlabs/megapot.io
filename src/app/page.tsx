import { jackpotService } from "@/lib/services/jackpot";
import { formatDrawingTime, formatUSDC } from "@/lib/utils/stringUtils";
import Account from "@/components/Account";

export default async function Home() {
  const state = await jackpotService.getCurrentDrawingState();

  return (
    <main className="min-h-svh flex flex-col">
      <header className="p-4 flex justify-end">
        <Account />
      </header>
      <div className="flex-1 flex items-center justify-center text-primary">
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
      </div>
    </main>
  );
}
