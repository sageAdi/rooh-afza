import { oneInch } from '@/app/_utils/config';
import axios from 'axios';

export async function GET(requset: Request) {
  const url = new URL(requset.url);
  const searchParams = new URLSearchParams(url.searchParams);
  const chainId = searchParams.get('chainId');
  const src = searchParams.get('src');
  const dst = searchParams.get('dst');
  const amount = searchParams.get('amount');
  const params = {
    src,
    dst,
    amount,
    includeTokensInfo: true,
    includeProtocols: true,
    includeGas: false,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
    params,
  };
  try {
    const { data }: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/quote`, config);
    return Response.json({ status: true, ...data });
  } catch (e: any) {
    console.log(e);
    return Response.json({ status: false });
  }
}
