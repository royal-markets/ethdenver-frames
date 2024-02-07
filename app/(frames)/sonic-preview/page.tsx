import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Learn More',
      action: 'link',
      target: 'https://sonic.royal.io/',
    },
    { label: 'Claim NFT', action: 'post' },
  ],
  image: `${process.env.BASE_URL}/sonic-preview/frame-01-sonic.gif`,
  post_url: `${process.env.BASE_URL}/api/sonic-preview`,
});

export const metadata: Metadata = {
  title: 'Royal - Farcaster Frames',
  description: 'Royal - Farcaster Frames',
  openGraph: {
    title: 'Royal - Farcaster Frames',
    description: 'Royal - Farcaster Frames',
    images: [`${process.env.BASE_URL}/sonic-preview/frame-01-sonic.gif`],
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
