
import { megapotV2Contract } from '@/contracts/megapotV2';

export default async function Home() {
  const drawingId = await megapotV2Contract.read.currentDrawingId();
  // const ethAmount = (Number(jackpot) / 1e18).toFixed(4);

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Megapot V2</h1>
        <p className="text-lg">Current Jackpot: {drawingId}</p>
      </div>
    </main>
  );
}
