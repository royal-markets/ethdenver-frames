import viem, { http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

const publicClient = viem.createPublicClient({
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

const account = privateKeyToAccount(process.env.AIRDROPPER_PRIVATE_KEY as `0x${string}`);

const walletClient = viem.createWalletClient({
  account,
  chain: baseSepolia,
  transport: http(process.env.ALCHEMY_URL),
});

export function getContract(address: `0x${string}`, abi: any) {
  return viem.getContract({
    address,
    abi,
    client: { public: publicClient, wallet: walletClient },
  });
}
