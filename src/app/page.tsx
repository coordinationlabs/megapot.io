import { getMegapotV2Contract, DrawingState } from "@/contracts/megapotV2";
import { formatUSDC } from "@/lib/utils/stringUtils";

export default async function Home() {
  const contract = getMegapotV2Contract();
  const drawingId = await contract.currentDrawingId();
  const state = (await contract.getDrawingState(drawingId)) as DrawingState;

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Megapot V2</h1>

        <p className="text-lg">Prize Pool: ${formatUSDC(state.prizePool)}</p>
      </div>
    </main>
  );
}
