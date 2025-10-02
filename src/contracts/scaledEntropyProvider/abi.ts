export const scaledEntropyProviderAbi = [
  {
    inputs: [
      { internalType: "address", name: "_entropy", type: "address" },
      { internalType: "address", name: "_entropyProvider", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
    name: "CallbackFailed",
    type: "error",
  },
  { inputs: [], name: "InsufficientFee", type: "error" },
  { inputs: [], name: "InvalidCallback", type: "error" },
  { inputs: [], name: "InvalidRange", type: "error" },
  { inputs: [], name: "InvalidRequests", type: "error" },
  { inputs: [], name: "InvalidSamples", type: "error" },
  { inputs: [], name: "InvalidSelector", type: "error" },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  { inputs: [], name: "UnknownSequence", type: "error" },
  { inputs: [], name: "ZeroAddress", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "randomNumber",
        type: "bytes32",
      },
    ],
    name: "EntropyFulfilled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint64",
        name: "sequence",
        type: "uint64",
      },
      {
        indexed: true,
        internalType: "address",
        name: "callback",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "samples",
        type: "uint256",
      },
    ],
    name: "ScaledRandomnessDelivered",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint64", name: "sequence", type: "uint64" },
      { internalType: "address", name: "provider", type: "address" },
      { internalType: "bytes32", name: "randomNumber", type: "bytes32" },
    ],
    name: "_entropyCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntropyContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntropyProvider",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint32", name: "_gasLimit", type: "uint32" }],
    name: "getFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint64", name: "sequence", type: "uint64" }],
    name: "getPendingRequest",
    outputs: [
      {
        components: [
          { internalType: "address", name: "callback", type: "address" },
          { internalType: "bytes4", name: "selector", type: "bytes4" },
          { internalType: "bytes", name: "context", type: "bytes" },
          {
            internalType: "bytes32",
            name: "userRandomNumber",
            type: "bytes32",
          },
          {
            components: [
              { internalType: "uint8", name: "samples", type: "uint8" },
              { internalType: "uint8", name: "minRange", type: "uint8" },
              { internalType: "uint8", name: "maxRange", type: "uint8" },
              { internalType: "bool", name: "withReplacement", type: "bool" },
            ],
            internalType: "struct IScaledEntropyProvider.SetRequest[]",
            name: "setRequests",
            type: "tuple[]",
          },
        ],
        internalType: "struct ScaledEntropyProvider.PendingRequest",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_userRandomNumber", type: "bytes32" },
      { internalType: "uint32", name: "_gasLimit", type: "uint32" },
      {
        components: [
          { internalType: "uint8", name: "samples", type: "uint8" },
          { internalType: "uint8", name: "minRange", type: "uint8" },
          { internalType: "uint8", name: "maxRange", type: "uint8" },
          { internalType: "bool", name: "withReplacement", type: "bool" },
        ],
        internalType: "struct IScaledEntropyProvider.SetRequest[]",
        name: "_requests",
        type: "tuple[]",
      },
      { internalType: "address", name: "_callback", type: "address" },
      { internalType: "bytes4", name: "_selector", type: "bytes4" },
      { internalType: "bytes", name: "_context", type: "bytes" },
    ],
    name: "requestAndCallbackScaledRandomness",
    outputs: [{ internalType: "uint64", name: "sequence", type: "uint64" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_entropyProvider", type: "address" },
    ],
    name: "setEntropyProvider",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export default scaledEntropyProviderAbi;
