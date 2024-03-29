import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from './Sidebar';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/config/wagmiConfig';
import { WagmiContextProvider } from '@/provider/WagmiContextProvider';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 Whisper',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <WagmiContextProvider initialState={initialState}>
            <Sidebar>{children}</Sidebar>
          </WagmiContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
