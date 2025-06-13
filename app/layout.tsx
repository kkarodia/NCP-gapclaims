import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReduxProvider } from '@/components/providers/redux-provider';
import { ClientBodyWrapper } from '@/components/client-body-wrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Netcare App',
  description: 'Professional healthcare management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ClientBodyWrapper>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ClientBodyWrapper>
      </body>
    </html>
  );
}