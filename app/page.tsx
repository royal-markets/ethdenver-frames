import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim NFT',
    },
  ],
  // TODO: Replace URL with env var
  image: ' https://tolerant-better-phoenix.ngrok-free.app/waves.jpeg',
  post_url: ' https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
});

export const metadata: Metadata = {
  title: 'Royal - Farcaster Frames',
  description: 'Royal - Farcaster Frames',
  openGraph: {
    title: 'Royal - Farcaster Frames',
    description: 'Royal - Farcaster Frames',
    images: [' https://tolerant-better-phoenix.ngrok-free.app/waves.jpeg'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Royal - Farcaster Frames</h1>
    </>
  );
}
