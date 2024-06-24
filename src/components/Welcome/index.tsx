import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { isClient } from '@/utils';
import Image from 'next/image';
import Ball from './components/Ball';

const WelcomeWrap = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 10px;
  left: 0;
  background: #000;
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
    background: #fff;
    top: -11px;
    bottom: 0;
    width: 100%;
    position: absolute;
    transition: 0.35s;
  }

  .loading-text {
    text-align: center;
    margin-top: 10px;
  }
`;

interface IProps {
  onEnd: () => void;
}

const Welcome = (props: IProps) => {
  const [loadText, setLoadText] = useState(0);
  const isEnd = useRef(false);

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
      progress = progress > 100 ? 100 : progress;
      setLoadText(Math.floor(progress));

      if (progress >= 100) {
        window.clearInterval(fakeLoaderInterval);
        lp && (lp.style.transform = 'translateX(100%)');
        const load: any = document.querySelector('.loading');
        load &&
          setTimeout(() => {
            load.style.transform = 'translateY(calc(100% + 10px))';
            isEnd.current = true;
          }, 400);
      }
    }, getRandomArbitrary(100, 500));
  }, []);

  return (
    <WelcomeWrap
      className="loading"
      onTransitionEnd={() => {
        if (isEnd.current) {
          props.onEnd();
        }
      }}
    >
      <div className="loading-progress"></div>
      <div className="loading-text">LOADING {loadText}%</div>

      <Ball />

      <h1 className="loading-title flex-center">
        <Image className="w-139 h-95" src={require('@img/common/welcome-logo.png')} alt="" />
      </h1>
    </WelcomeWrap>
  );
};

export default Welcome;
