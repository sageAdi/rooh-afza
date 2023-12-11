import { formatEther, formatUnits } from 'ethers';

function unitConversion(value: string, from: string, to: string) {
  return to !== 'wei' ? formatUnits(value, to) : formatEther(value);
}

export async function GET() {
  Response.json({ text: 'Successful Call' });
}

export async function POST(request: Request) {
  const { value, from, to } = await request.json();
  try {
    Response.json({ data: unitConversion(value, from, to), message: 'success' });
  } catch (e) {
    Response.json({ error: e, message: 'Internal Server Error' });
  }
}
