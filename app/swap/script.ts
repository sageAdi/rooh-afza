'use server';

import axios from 'axios';
import { oneInch } from '../_utils/config';

const validation = (
  chainId: number,
  tokenIn?: string,
  tokenOut?: string,
  amount?: string,
  from?: string,
  slippage?: number,
) => {
  if (!chainId) {
    throw new Error('chainId is required');
  }
  // if (tokenIn === tokenOut && tokenIn !== null && tokenOut !== '') {
  //   throw new Error('tokenIn and tokenOut cannot be the same');
  // }
  if (Number(amount) <= 0) {
    throw new Error('amount must be greater than 0');
  }
  if (from) {
    throw new Error('no sender address sended');
  }
  if (slippage) {
    if (slippage > -1 && slippage < 51) throw new Error('slippage must be between 0 and 50');
  }
};

const getSigner = async () => {
  const provider: any = 'new BrowserProvider()';
  return provider.getSigner();
};

export async function inTokens(chainId: number) {
  validation(chainId);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
  };
  const response: any = await axios.get(`${oneInch.SWAP_URL}1/tokens`, config);
  if (response?.data) {
    const _data = response?.data;
    return _data.tokens;
  }
  return { error: 'Failed to get allowance', message: 'Internal Server Error' };
}

export async function swap(chainId: number, src: string, dst: string, amount: string) {
  validation(chainId, src, dst, amount);
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
  const response: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/quote`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    return _data.toAmount;
  }
  throw new Error('Failed to get quote');
}

// Completed the transaction using the wallet
export async function route(data: any) {
  const signer = await getSigner();
  validation(data);
  const params = {
    ...data,
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
  const response: any = await axios.get(`${oneInch.SWAP_URL}${data.chainId}/swap`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    const txResponse = await signer.sendTransaction(_data.allOf[0]);
    await txResponse.wait();
    return txResponse.hash;
  }
  throw new Error('Failed to route');
}

export async function outTokens(chainId: number, inTokenAddress: string, walletAddress: string) {
  validation(chainId, inTokenAddress, walletAddress);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
    params: {
      tokenAddress: inTokenAddress,
      walletAddress: walletAddress,
    },
  };
  const response: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/approve/allowance`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    return _data.allowance;
  }
  throw new Error('Failed to get allowance');
}

// Completed the transaction using the wallet
export async function approve(chainId: number, tokenAddress: string, amount: string) {
  validation(chainId, tokenAddress, amount);
  const signer = await getSigner();
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
    params: {
      tokenAddress,
      amount,
    },
  };
  const response: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/approve/transaction`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    const txResponse = await signer.sendTransaction(_data);
    await txResponse.wait();
    return txResponse.hash;
  }
  throw new Error('Failed to approve');
}

export async function delegator(chainId: number) {
  validation(chainId);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
  };
  const response: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/approve/spender`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    return _data.address;
  }
  throw new Error('Failed to get spender');
}

export async function gasPrice(chainId: number) {
  validation(chainId);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
  };
  const response: any = await axios.get(`${oneInch.GAS_URL}${chainId}`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    return _data;
  }
  throw new Error('Failed to get spender');
}
