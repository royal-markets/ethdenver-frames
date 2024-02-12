import { FrameRequest, getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

import MintABI from '../../../lib/ABIs/MintABI';
import { getContract } from '../../../lib/utils/nftContract';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let tokenId: string | undefined = '';

  const body: FrameRequest = await req.json();

  try {
    const { isValid, message } = await getFrameMessage(body, {
      neynarApiKey: process.env.NEYNAR_API_KEY || '',
    });

    if (!isValid) {
      throw new Error('Failed to validate frame');
    }

    // Check if the user is a follower
    //
    // TODO: Might be good to check if the user is a follower of Royal's specific account
    // rather than the generic "following" flag.
    const is_follower = message.following;
    if (!is_follower) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Learn More',
              action: 'link',
              target: 'https://sonic.royal.io/',
            },
            { label: 'Claim NFT', action: 'post' },
          ],
          image: `${process.env.BASE_URL}/sonic-preview/frame-01-follow.gif`,
          post_url: `${process.env.BASE_URL}/api/sonic-preview`,
        }),
      );
    }

    // Check if the user has a connected wallet
    accountAddress = message.interactor.verified_accounts[0];
    if (!accountAddress) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Learn More',
              action: 'link',
              target: 'https://sonic.royal.io/',
            },
            { label: 'Next', action: 'post' },
          ],
          image: `${process.env.BASE_URL}/sonic-preview/frame-02-wallet.gif`,
          post_url: `${process.env.BASE_URL}/api/sonic-preview`,
        }),
      );
    }

    const nftContract = getContract(
      process.env.SONIC_PREVIEW_NFT_CONTRACT as `0x${string}`,
      MintABI,
      process.env.SONIC_PREVIEW_AIRDROPPER_PRIVATE_KEY as `0x${string}`,
    );

    // Check if the user already has an NFT
    // if so, don't mint another one
    const userBalance = await nftContract.read.balanceOf([accountAddress as `0x${string}`]);
    if (userBalance > 0) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [
            {
              label: 'Generate your Song!',
              action: 'link',
              target: 'https://royal.io/sonic',
            },
          ],
          image: `${process.env.BASE_URL}/sonic-preview/frame-03-mint.gif`,
        }),
      );
    }

    // Mint and airdrop NFT to the user's connected wallet
    tokenId = await nftContract.write.mintTo([accountAddress as `0x${string}`]);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [
          {
            label: 'Generate your Song!',
            action: 'link',
            target: 'https://royal.io/sonic',
          },
        ],
        image: `${process.env.BASE_URL}/sonic-preview/frame-03-mint.gif`,
      }),
    );
  } catch (err) {
    console.error(err);

    // Something went wrong - show error screen
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [{ label: 'Retry', action: 'post' }],
        image: `${process.env.BASE_URL}/sonic-preview/frame-04-error.png`,
        post_url: `${process.env.BASE_URL}/api/sonic-preview`,
      }),
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
