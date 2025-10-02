export type SetRequest = {
  samples: number;
  minRange: number;
  maxRange: number;
  withReplacement: boolean;
};

export type PendingRequest = {
  callback: string;
  selector: string;
  context: string;
  userRandomNumber: string;
  setRequests: SetRequest[];
};
