import { getMegapotV2Contract } from "@/contracts/megapotV2";
import { DrawingState } from "@/contracts/megapotV2/types";

class JackpotService {
  private contract = getMegapotV2Contract();

  async getCurrentDrawingState(): Promise<DrawingState> {
    const drawingId = await this.contract.currentDrawingId();
    const state = (await this.contract.getDrawingState(
      drawingId
    )) as DrawingState;
    return state;
  }

  async getDrawingState(drawingId: bigint): Promise<DrawingState> {
    return (await this.contract.getDrawingState(drawingId)) as DrawingState;
  }
}

export const jackpotService = new JackpotService();
