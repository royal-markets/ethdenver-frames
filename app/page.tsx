import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim NFT',
    },
  ],
  image: 'https://f39c-136-49-112-158.ngrok-free.app/waves.jpeg',
  post_url: 'https://f39c-136-49-112-158.ngrok-free.app/api/frame',
});

export const metadata: Metadata = {
  title: 'Royal IRL - ETH Denver 2024',
  description: 'Royal IRL - ETH Denver 2024',
  openGraph: {
    title: 'Royal IRL - ETH Denver 2024',
    description: 'Royal IRL - ETH Denver 2024',
    images: ['https://f39c-136-49-112-158.ngrok-free.app/waves.jpeg'],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Royal IRL - ETH Denver 2024</h1>
    </>
  );
}
