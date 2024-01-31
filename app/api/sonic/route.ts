import { FrameRequest, getFrameAccountAddress, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

import neynar from '../../../src/helpers/neynarClient';

import MintABI from '../../../src/ABIs/MintABI';
import { getContract } from '../../../src/helpers/nftContract';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let tokenId: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (isValid) {
    try {
      const cast = await neynar.lookUpCastByHash(message.castId.hash);

      if (!cast?.result?.cast?.recasts?.fids?.includes(message.fid)) {
        return new NextResponse(`<!DOCTYPE html><html><head>
            <meta property="fc:frame" content="vNext" />
            <meta property="fc:frame:image" content=https://frames.royal.io/waves.jpeg />
            <meta property="fc:frame:button:1" content="Recast to claim" />
            <meta property="fc:frame:post_url" content="https://frames.royal.io/api/sonic" />
          </head></html>`);
      }

      accountAddress = await getFrameAccountAddress(message, {
        NEYNAR_API_KEY: process.env.NEYNAR_API_KEY || '',
      });

      // TODO: If no accountAddress - show image saying you need one.

      // tokenId = await nftContract.write.mintTo(
      //   accountAddress as unknown as readonly [`0x${string}`],
      // );
    } catch (err) {
      console.error(err);
    }
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content=https://frames.royal.io/waves2.jpeg />
    <meta property="fc:frame:button:1" content="${tokenId}" />
    <meta property="fc:frame:post_url" content="https://frames.royal.io/api/sonic" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
