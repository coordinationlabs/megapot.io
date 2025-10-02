export type DrawingState = {
  prizePool: bigint;
  ticketPrice: bigint;
  edgePerTicket: bigint;
  globalTicketsBought: bigint;
  lpEarnings: bigint;
  ballMax: bigint;
  powerballMax: bigint;
  drawingTime: bigint;
  winningTicket: bigint;
  jackpotLock: boolean;
};

export type Ticket = {
  normals: number[];
  powerball: number;
};
