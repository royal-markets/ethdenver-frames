import { FrameRequest, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

import { validateFrameAction, ValidateFrameContext } from '../../../lib/utils/neynar';

import MintABI from '../../../lib/ABIs/MintABI';
import { getContract } from '../../../lib/utils/nftContract';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let tokenId: string | undefined = '';

  const body: FrameRequest = await req.json();

  try {
    const validateFrameContext = await validateFrameAction(body.trustedData.messageBytes);
    // TODO: Turn into guard clause
    if (validateFrameContext) {
      validateFrameContext as ValidateFrameContext;

      const is_follower = validateFrameContext.action.interactor.viewer_context.following;
      if (!is_follower) {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [{ label: 'Must follow me to mint', action: 'post' }],
            image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
            post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
          }),
        );
      }

      accountAddress = validateFrameContext.action.interactor.verifications[0];
      if (!accountAddress) {
        return new NextResponse(
          getFrameHtmlResponse({
            buttons: [{ label: 'Need connected wallet to mint', action: 'post' }],
            image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
            post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
          }),
        );
      }

      // const nftContract = getContract(MintABI, NFT_CONTRACT_ADDRESS);
      // const userBalance = await nftContract.read.balanceOf(accountAddress);
      // if (userBalance > 0) {
      //   return new NextResponse(
      //     getFrameHtmlResponse({
      //       buttons: [{ label: 'Already minted - Go to Sonic!', action: 'post_redirect' }],
      //       image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
      //       post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic_redirect',
      //     }),
      //   );
      // }

      // tokenId = await nftContract.write.mintTo(accountAddress as unknown as readonly [`0x${string}`]);
      // return new NextResponse(
      //   getFrameHtmlResponse({
      //     buttons: [{ label: 'Minted - Go to Sonic!', action: 'post_redirect' }],
      //     image: 'https://tolerant-better-phoenix.ngrok-free.app/waves3.avif',
      //     post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic_redirect',
      //   }),
      // );
    }
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

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [{ label: 'We got to the end!', action: 'post' }],
      image: 'https://tolerant-better-phoenix.ngrok-free.app/waves4.avif',
      post_url: 'https://tolerant-better-phoenix.ngrok-free.app/api/sonic',
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
