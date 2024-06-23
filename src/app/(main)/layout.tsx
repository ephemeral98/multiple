'use client';
import { Inter } from 'next/font/google';
import '@/assets/css/globals.css';
import '@/assets/css/reset.css';
import '@arco-design/web-react/dist/css/arco.css';
import React, { Suspense, useEffect, useState } from 'react';
import Wrapper from '@/layouts';
import Welcome from '@cps/Welcome';
import 'animate.css';
import { useScrollAnimate } from '@/hooks/useScrollAnimate';
import { isClient } from '@/utils';

import { bpThrottle } from '@/hooks/useDeb';
import initRem from '@/utils/initRem';
import useAppStore from '@/store/appStore';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appStore = useAppStore();
  // 延迟滚动
  useScrollAnimate();
  const [welcomeEnd, setWelcomeEnd] = useState<boolean>(true);

  useEffect(() => {
    if (!isClient()) {
      return;
    }

    initRem();
    appStore.setCurDevice();
    window.onresize = bpThrottle(() => {
      appStore.setCurDevice();
    });
  }, []);

  return (
    <html style={{ fontSize: '1px' }}>
      <head>
        <title>Multiple</title>
        <link rel="icon" href="/logo.png" />
      </head>
      <body id="app" className={`${inter.className} app`}>
        {welcomeEnd ? (
          <Welcome onEnd={() => setWelcomeEnd(false)} />
        ) : (
          <Wrapper>
            <div slot="left" className="h-full">
              <Suspense></Suspense>
            </div>
            <div slot="main" className="h-full">
              {children}
            </div>
          </Wrapper>
        )}
      </body>
    </html>
  );
}
