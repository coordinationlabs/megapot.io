import { getMegapotV2Contract } from "@/contracts/megapotV2";

export default async function Home() {
  let drawingId: bigint | null = null;
  let error: string | null = null;

  try {
    const contract = getMegapotV2Contract();
    drawingId = await contract.currentDrawingId();
  } catch {
    error = "Failed to load current drawing";
  }

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Megapot V2</h1>
        {error ? (
          <p className="text-lg text-red-500">{error}</p>
        ) : (
          <p className="text-lg">Current Drawing: {drawingId?.toString()}</p>
        )}
      </div>
    </main>
  );
}
