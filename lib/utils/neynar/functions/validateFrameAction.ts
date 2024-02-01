import {
  NeynarResponse,
  ValidateFrameContext,
  ValidateFrameWithCastContext,
} from '../neynarInterfaces';
import { FetchError } from '../exceptions/FetchError';

// https://docs.neynar.com/reference/validate-frame
// Assumes `follow_context = true`
export async function validateFrameAction(
  messageBytesInHex: string,
  castReactionContext: boolean = false,
  // followContext: true,
): Promise<ValidateFrameContext | undefined> {
  const options = {
    method: 'POST',
    url: 'https://api.neynar.com/v2/farcaster/frame/validate',
    // TODO: Should API_KEY be passed in?
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      api_key: process.env.NEYNAR_API_KEY || '',
    },
  };

  const res = await fetch(options.url, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify({
      message_bytes_in_hex: messageBytesInHex,
      cast_reaction_context: castReactionContext,
      follow_context: true,
    }),
  });

  if (res.status !== 200) {
    throw new FetchError(
      `Failed to validate frame - non-200 status code returned from Neynar: ${res.status}`,
    );
  }

  const json: NeynarResponse = await res.json();
  if (!json || !json.valid) {
    return;
  }

  return json as ValidateFrameContext;
}
