import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const neynar = new NeynarAPIClient(process.env.NEYNAR_API_KEY || '');

export default neynar;
