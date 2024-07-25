'use client';
import { forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react';
import { styled } from 'styled-components';
import useHomeStore from '@/store/homeStore';

interface IProps {
  children: ReactNode;
  src: string;
  className?: string;
}

const VideoBoxWrap = styled.div`
  line-height: 1;
  position: relative;

  .home-video {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    opacity: 0.68;
  }
`;

const VideoBox = forwardRef((props: IProps, ref) => {
  const homeStore = useHomeStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    videoRef: videoRef,
    isEnd: isEnd,
  }));

  /**
   * 点击了进入按钮,或者视频播放完
   */
  const handleEnter = () => {
    setIsEnd(true);
  };

  const loaded = () => {
    homeStore.setVideoLoaded();
  };

  const onError = () => {
    homeStore.setVideoLoaded();
  };

  return (
    <VideoBoxWrap>
      {props.children}

      <video
        loop
        className={`home-video ${!!props.className ? props.className : ''}`}
        ref={videoRef}
        muted
        onEnded={handleEnter}
        x5-video-player-fullscreen="true"
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline
        preload="auto"
        onLoadedData={loaded}
        onError={onError}
      >
        <source src={props.src} type="video/mp4" />
      </video>
    </VideoBoxWrap>
  );
});

export default VideoBox;
