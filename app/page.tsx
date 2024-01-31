import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Claim NFT',
    },
  ],
  image: 'https://frames.royal.io/waves.jpeg',
  post_url: 'https://frames.royal.io/api/sonic',
});

export const metadata: Metadata = {
  title: 'Royal IRL - ETH Denver 2024',
  description: 'Royal IRL - ETH Denver 2024',
  openGraph: {
    title: 'Royal IRL - ETH Denver 2024',
    description: 'Royal IRL - ETH Denver 2024',
    images: ['https://frames.royal.io/waves.jpeg'],
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
