import { getMegapotV2Contract } from "@/contracts/megapotV2";

export default async function Home() {
  const contract = getMegapotV2Contract();
  const drawingId = await contract.currentDrawingId();

  return (
    <main className="min-h-svh flex items-center justify-center text-primary">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Megapot V2</h1>

        <p className="text-lg">Current Drawing: {drawingId?.toString()}</p>
      </div>
    </main>
  );
}
