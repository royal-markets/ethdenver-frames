const MintABI = [
  // TODO: Add full ABI (need balanceOf)
  {
    type: 'function',
    name: 'mintTo',
    inputs: [
      {
        name: 'to',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [
      {
        name: 'tokenId',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
] as const;

export default MintABI;
