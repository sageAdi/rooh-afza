import { NextRequest, NextResponse } from 'next/server';

async function createNFT() {}

export async function POST(req: NextRequest, res: NextResponse) {
  // const {chain, data, to} = await req.json();
  try {
    Response.json({ data: await createNFT(), message: 'success' });
  } catch (e) {
    Response.json({ error: e, message: 'Internal Server Error' });
  }
}
