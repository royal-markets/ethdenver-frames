import {
  Abi,
  http,
  createPublicClient,
  createWalletClient,
  getContract as viemGetContract,
} from 'viem';
import { baseSepolia, base } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

// TODO: Make this dependent on an ENV VAR
// - chainId
const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.MAINNET_ALCHEMY_URL),
});

export function getContract<T extends Abi>(
  address: `0x${string}`,
  abi: T,
  privateKey: `0x${string}`,
) {
  // TODO: Make privateKey an optional field
  // If we don't have a private key, we can only use the public client
  // if (!privateKey) {
  //   return viemGetContract({
  //     address,
  //     abi,
  //     client: publicClient,
  //   });
  // }

  // If we have a private key, we can use the wallet client
  const account = privateKeyToAccount(privateKey);
  const walletClient = createWalletClient({
    account,
    // TODO: Make this dependent on an ENV VAR
    chain: base,
    transport: http(process.env.MAINNET_ALCHEMY_URL),
  });

  return viemGetContract({
    address,
    abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
