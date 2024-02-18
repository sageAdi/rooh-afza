import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { arbitrum, mainnet, polygon, base } from 'wagmi/chains';
import { cookieStorage, createStorage } from 'wagmi';

// Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: [arbitrum, mainnet, polygon, base],
  metadata,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
