import {
  Abi,
  http,
  createPublicClient,
  createWalletClient,
  getContract as viemGetContract,
} from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const publicClient = createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

const account = privateKeyToAccount(
  process.env.SONIC_ACCESS_AIRDROPPER_PRIVATE_KEY as `0x${string}`,
);

const walletClient = createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

export function getContract<T extends Abi>(address: `0x${string}`, abi: T) {
  return viemGetContract({
    address,
    abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
