import {
  Abi,
  http,
  createPublicClient,
  createWalletClient,
  getContract as viemGetContract,
} from 'viem';
import { baseSepolia, base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// Helper to get the viem chain and RPC_URL based on `process.env.CHAIN_ID`
function getChain(): [typeof baseSepolia | typeof base, string | undefined] {
  switch (process.env.CHAIN_ID) {
    case baseSepolia.id.toString():
      return [baseSepolia, process.env.BASE_SEPOLIA_ALCHEMY_URL];

    case base.id.toString():
      return [base, process.env.BASE_MAINNET_ALCHEMY_URL];

    default:
      throw new Error('Invalid chain id');
  }
}

// Helper to get a contract instance with ability to read/write from the contract
export function getContract<T extends Abi>(
  address: `0x${string}`,
  abi: T,
  privateKey: `0x${string}`,
) {
  const [chain, rpcUrl] = getChain();

  const publicClient = createPublicClient({
    chain,
    transport: http(rpcUrl),
  });

  // If we have a private key, we can use the wallet client
  const account = privateKeyToAccount(privateKey);
  const walletClient = createWalletClient({
    account,
    chain,
    transport: http(rpcUrl),
  });

  return viemGetContract({
    address,
    abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
