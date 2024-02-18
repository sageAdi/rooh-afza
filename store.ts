import { signal, useSignal } from '@preact/signals-react';
import { mainnet } from '@wagmi/core/chains';

export const useChainId = () => {
  const chainId = useSignal<Number>(mainnet.id);
  return chainId;
};

export const chain = signal<number>(mainnet.id);
