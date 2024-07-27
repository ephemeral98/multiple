import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { isClient } from '@/utils';
import Image from 'next/image';
import Ball from './components/Ball';
import { flexPos } from '@/styled/mixin';
import useHomeStore from '@/store/homeStore';
import { useUpdateEffect } from 'ahooks';
import { usePathname } from 'next/navigation';

const WelcomeWrap = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  left: 0;
  transition: 0.75s;
  z-index: 9999999;

  .loading-title {
    margin: 4.5rem 0 1rem;

    color: #fff;
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .loading-progress {
    height: 11px;
    background-color: #000;
    bottom: -11px;
    bottom: 0;
    width: 100%;
    position: absolute;
    transition: 0.35s;
  }

  .loading-bg-bar {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 11px;
    border-radius: 10px;
    background-color: #fff;
    transition: all 1s;

    &.loading-end {
      background-color: #000;
    }
  }

  .loading-bg {
    position: fixed;
    left: 0;
    bottom: 11px;
    width: 100%;
    height: 100%;
    background-color: #000;
    /* z-index: -1; */
    ${flexPos('center', 'flex-end')}
  }

  .loading-text {
    text-align: center;
    /* margin-top: 11px; */
  }
`;

interface IProps {
  onEnd: () => void;
}

const PROGRESSMAX = 99; // 进度条最大值

const Welcome = (props: IProps) => {
  const route = usePathname();
  const homeStore = useHomeStore();

  const [loadText, setLoadText] = useState(0);
  const isProgressEnd = useRef(false);
  const allReady = useRef(false); // 视频也加载完了，loading也加载完了

  useEffect(() => {
    if (!isClient()) {
      return;
    }

    function getRandomArbitrary(min: any, max: any) {
      return Math.random() * (max - min) + min;
    }

    // fake loader
    let progress = 0;
    const fakeLoaderInterval = window.setInterval(function () {
      const lp: any = document.querySelector('.loading-progress');
      progress = progress + getRandomArbitrary(8, 15);
      lp && (lp.style.transform = `translateX(${progress}%)`);
      progress = progress > PROGRESSMAX ? PROGRESSMAX : progress;
      setLoadText(Math.floor(progress));

      if (progress >= PROGRESSMAX) {
        isProgressEnd.current = true;
        window.clearInterval(fakeLoaderInterval);
      }
    }, getRandomArbitrary(100, 500));
  }, []);

  useUpdateEffect(() => {
    if (!isClient()) {
      return;
    }

    const condiction =
      route === '/' ? isProgressEnd.current && homeStore.videoLoaded : isProgressEnd.current;

    if (condiction) {
      const lp: any = document.querySelector('.loading-progress');
      lp && (lp.style.transform = `translateX(${PROGRESSMAX}%)`);
      const load: any = document.querySelector('.loading');
      if (load) {
        setTimeout(() => {
          load.style.transform = 'translateY(calc(-100% - 11px))';
          allReady.current = true;
        }, 400);
      }
    }
  }, [homeStore.videoLoaded, isProgressEnd.current]);

  return (
    <WelcomeWrap
      className="loading"
      onTransitionEnd={() => {
        if (allReady.current) {
          props.onEnd();
        }
      }}
    >
      <div className={`loading-bg-bar ${allReady.current ? 'loading-end' : ''}`}></div>
      <div className="loading-bg">
        <div className="loading-text">LOADING {loadText}%</div>
      </div>
      <div className="loading-progress"></div>

      <Ball />

      <h1 className="loading-title flex-center">
        <Image
          priority
          className="w-350"
          src={require('@img/common/welcome-logo.png')}
          alt=""
        />
      </h1>
    </WelcomeWrap>
  );
};

export default Welcome;
