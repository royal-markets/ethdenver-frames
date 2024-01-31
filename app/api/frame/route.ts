import {
  FrameRequest,
  getFrameAccountAddress,
  getFrameMessage,
} from "@coinbase/onchainkit";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import QRCode from "qrcode";

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = "";
  let filePath: string | undefined = "";
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  if (isValid) {
    try {
      accountAddress = await getFrameAccountAddress(message, {
        NEYNAR_API_KEY: process.env.NEYNAR_API_KEY || "",
      });
      if (accountAddress) {
        filePath = path.join(
          process.cwd(),
          "qrcodes",
          `accountAddress-${accountAddress}.png`,
        );
        await QRCode.toFile(filePath, accountAddress);
        console.log(`filePath: ${filePath}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return new NextResponse(`<!DOCTYPE html><html><head>
    <meta property="fc:frame" content="vNext" />
    <meta property="fc:frame:image" content=https://ethdenver-frames-cugiftq8u-royalio.vercel.app/qrcodes/accountAddress-${accountAddress}.png />
    <meta property="fc:frame:button:1" content="${accountAddress}" />
    <meta property="fc:frame:post_url" content="https://ethdenver-frames-cugiftq8u-royalio.vercel.app/api/frame" />
  </head></html>`);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = "force-dynamic";
