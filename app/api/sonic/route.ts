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

    const is_follower = message.following;
    if (!is_follower) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [{ label: 'Must follow me to mint', action: 'post' }],
          image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
          post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
        }),
      );
    }

    accountAddress = message.interactor.verified_accounts[0];
    if (!accountAddress) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [{ label: 'Need connected wallet to mint', action: 'post' }],
          image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
          post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
        }),
      );
    }

    const nftContract = getContract(
      process.env.SONIC_ACCESS_NFT_CONTRACT as `0x${string}`,
      MintABI,
    );

    const userBalance = await nftContract.read.balanceOf([accountAddress as `0x${string}`]);
    if (userBalance > 0) {
      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [{ label: 'Already minted - Go to Sonic!', action: 'post_redirect' }],
          image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
          post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic_redirect',
        }),
      );
    }

    tokenId = await nftContract.write.mintTo([accountAddress as `0x${string}`]);
    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [{ label: 'Minted - Go to Sonic!', action: 'post_redirect' }],
        image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
        post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic_redirect',
      }),
    );
  } catch (err) {
    console.error(err);

    return new NextResponse(
      getFrameHtmlResponse({
        buttons: [{ label: 'Something went wrong - try again!', action: 'post' }],
        image: 'https://tolerant-better-phoenix.ngrok-free.app/waves2.jpeg',
        post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
      }),
    );
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
