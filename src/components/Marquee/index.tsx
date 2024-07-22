import { isClient } from '@/utils';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { styled } from 'styled-components';

const MarqueeWrap = styled.div<{ calcwidth: string; trans: string; duration: string }>`
  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(${(props) => props.trans});
    }
  }

  width: ${(props) => props.calcwidth};
  overflow: hidden;

  display: flex;
  width: 100%;

  &.stick {
    width: 100%;
    text-align: center;
  }

  .moving-text {
    flex: 0 0 100%;
    animation: marquee ${(props) => props.duration} linear infinite;
  }
`;

const Marquee = (props: {
  duration?: number;
  children: ReactNode;
  infinity?: boolean;
  className?: string;
}) => {
  const [marqueeWidth, setMarqueeWidth] = useState('');
  const MarqueeContentRef = useRef<HTMLDivElement>(null);

  const calcWidth = useMemo(() => {
    if (!marqueeWidth || marqueeWidth === 'auto') {
      return '100';
    }
    return marqueeWidth;
  }, [marqueeWidth]);

  const trans = useMemo(() => {
    return `-${calcWidth}`;
  }, [calcWidth]);

  const duration = useMemo(() => {
    if (!props.infinity || !marqueeWidth || marqueeWidth === 'auto') {
      return '0s';
    }
    const t = calcWidth.replace('px', '');
    if (+t < 240) {
      return '0s';
    }
    return +t * (props.duration || 0.05) + 's';
  }, [calcWidth, marqueeWidth]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const style = getComputedStyle(MarqueeContentRef.current!.firstElementChild!);
    setMarqueeWidth(style.width);
  }, [MarqueeContentRef, isClient() && document.documentElement.style?.fontSize]);

  return (
    <MarqueeWrap
      className={`${props.className} ${duration === '0s' ? 'stick' : ''}`}
      calcwidth={calcWidth}
      trans={trans}
      duration={duration}
    >
      <div className="moving-text" ref={MarqueeContentRef}>
        {props.children}
      </div>

      {!!props.infinity && <div className="moving-text">{props.children}</div>}
    </MarqueeWrap>
  );
};

export default Marquee;
