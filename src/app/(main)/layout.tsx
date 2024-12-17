'use client';
import { Inter } from 'next/font/google';
import '@/assets/css/globals.css';
import '@/assets/css/reset.css';
import '@arco-design/web-react/dist/css/arco.css';

import React, { Suspense, useEffect, useState } from 'react';
import Wrapper from '@/layouts';
import Welcome from '@cps/Welcome';
import 'animate.css';
import { scrollAnimate } from '@/utils/scrollAnimate';
import { isClient } from '@/utils';
import '@/assets/font/index.css';

import { bpThrottle } from '@/hooks/useDeb';
import initRem from '@/utils/initRem';
import useAppStore from '@/store/appStore';
import { useCountDown } from 'ahooks';
import { useCopy } from '@/hooks';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appStore = useAppStore();
  const [welcomeEnd, setWelcomeEnd] = useState<boolean>(true);
  // 主app一开始不加载，让loading遮住的时候再加载并完成等一系列过程(做一个延迟)
  const [showApp, setShowApp] = useState<boolean>(false);
  const [targetDate, setTargetDate] = useState<number>(Date.now() + 100);
  const [countdown, formattedCountdown] = useCountDown({
    targetDate,
    onEnd() {
      setShowApp(true);
    },
  });

  useCopy();

  useEffect(() => {
    if (!isClient()) {
      return;
    }

    initRem();
    // 延迟滚动
    // scrollAnimate();
    appStore.scrollAnimate();
    appStore.setCurDevice();
    window.onresize = bpThrottle(() => {
      appStore.setCurDevice();
    });
  }, []);

  return (
    <html style={{ fontSize: '1px' }}>
      <head>
        <title>Multiple Network - Monetise Your Internet Connection.</title>
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="description" content="Monetise Your Internet Connection." />
        <meta
          name="keywords"
          content="Multiple Network, Depin, Bandwith, OKX Ventures, Blockchain Infrastructure"
        />
        <meta name="author" content="Multiple" />
      </head>
      <body id="app" className={`${inter.className} app`}>
        {welcomeEnd && <Welcome onEnd={() => {
          console.log('end...');
          setWelcomeEnd(false);
        }} />}

        {showApp && (
          <TonConnectUIProvider manifestUrl="https://multiple.cc/static-files/manifest.json">
            <Wrapper>
              <div slot="left" className="h-full">
                <Suspense></Suspense>
              </div>
              <div slot="main" className="h-full">
                {children}
              </div>
            </Wrapper>
          </TonConnectUIProvider>
        )}
      </body>
    </html>
  );
}
