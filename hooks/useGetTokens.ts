import { oneInch } from '@/app/_utils/config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function inTokens(chainId: number) {
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
  };
  const response: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/tokens`, config);
  if (response?.data) {
    return Object.values(response?.data?.tokens).slice(0, 20);
  }
  return { error: 'Failed to get allowance', message: 'Internal Server Error' };
}

const useGetTokens = (chainId: number) => {
  return useQuery({ queryKey: ['tokens', chainId], queryFn: () => inTokens(chainId) });
};

export default useGetTokens;
