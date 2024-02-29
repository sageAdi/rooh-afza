import { signal } from '@preact/signals-react';
import { mainnet } from '@wagmi/core/chains';

export const chain = signal<number>(mainnet.id);
