'use client';
import { Inter } from 'next/font/google';
import '@/assets/css/globals.css';
import '@/assets/css/reset.css';
import '@arco-design/web-react/dist/css/arco.css';
import React, { Suspense } from 'react';
import Wrapper from '@/layouts';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body id="app" className={`${inter.className} app`}>
        <Wrapper>
          <div slot="left" className="h-full">
            <Suspense>
            </Suspense>
          </div>
          <div slot="main" className="h-full">
            {children}
          </div>
        </Wrapper>
      </body>
    </html>
  );
}
