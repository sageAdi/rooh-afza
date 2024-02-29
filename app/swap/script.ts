'use server';

import axios from 'axios';
import { oneInch } from '../_utils/config';

const ZERO_ADDRESS: string = '0x0000000000000000000000000000000000000000';

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
  if (tokenIn) {
    if (tokenIn === ZERO_ADDRESS) {
      throw new Error('tokenIn cannot be zero address');
    }
  }
  if (tokenIn && tokenOut) {
    if (tokenIn === tokenOut && tokenOut === ZERO_ADDRESS) {
      throw new Error('tokenIn and tokenOut cannot be the same');
    }
  }
  if (Number(amount) <= 0) {
    throw new Error('amount must be greater than 0');
  }
  if (from) {
    throw new Error('no sender address sent');
  }
  if (slippage) {
    if (slippage > -1 && slippage < 51) throw new Error('slippage must be between 0 and 50');
  }
};

export async function inTokens(chainId: number): Promise<any> {
  validation(chainId);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
  };

  try {
    const { data }: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/tokens`, config);
    return Object.values(data.tokens).slice(0, 20);
  } catch (e) {
    console.log('error ' + e);
    return { error: 'Failed to get allowance', message: 'Internal Server Error' };
  }
}

export async function quote(chainId: number, src: string, dst: string, amount: string) {
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
  try {
    const { data }: any = await axios.get(`${oneInch.SWAP_URL}${chainId}/quote`, config);
    return data;
  } catch (e: any) {
    console.log(e);
    return e.message;
  }
}

export async function quoteNew(chainId: number, src: string, dst: string, amount: string) {}

// Completed the transaction using the wallet
export async function swap(data: any) {
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
    return response?.result?.data?.tx?.toAll[0];
  }
  throw new Error('Failed In Swapping');
}

export async function allowance(chainId: number, inTokenAddress: string, walletAddress: string) {
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
    return Object.values(response?.result?.data).slice(0, 20);
  }
  throw new Error("Didn't get allowance");
}

// Completed the transaction using the wallet
export async function approve(chainId: number, tokenAddress: string, amount: string) {
  validation(chainId, tokenAddress, amount);
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
    console.log(_data);
    return _data;
  }
  throw new Error('Failed to approve');
}

export async function delegatorAddress(chainId: number) {
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

export async function transactionHistory(chainId: number, walletAddress: string, limit?: number) {
  validation(chainId, walletAddress);
  const config = {
    headers: {
      Authorization: `Bearer ${oneInch.API_KEY}`,
    },
    params: {
      chainId,
      limit: limit || 10,
    },
  };
  const response: any = await axios.get(`https://api.1inch.dev/history/v2.0/history/${walletAddress}/events`, config);
  if (response?.result?.data) {
    const _data = response?.result?.data;
    console.log({ _data });
    return _data;
  }
  throw new Error('Failed to get transaction history');
}
