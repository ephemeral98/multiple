'use client';
import { useRef } from 'react';
import { styled } from 'styled-components';
// import videoSrc from '@/assets/video/video-1.mp4';

const VideoBoxWrap = styled.div`
  .home-video {
    width: 100%;
  }
`;

const VideoBox = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  /**
   * 点击了进入按钮,或者视频播放完
   */
  const handleEnter = () => {};

  const loaded = () => {
    console.log('video...', videoRef.current);
  };

  return (
    <VideoBoxWrap>
      <video
        autoPlay
        id="welcome-video"
        className="home-video"
        ref={videoRef}
        muted
        onEnded={handleEnter}
        onLoad={loaded}
        x5-video-player-fullscreen="true"
        x5-playsinline="true"
        webkit-playsinline="true"
        playsInline
        preload="auto"
      >
        <source src="/video/video-1.mp4" type="video/mp4" />
      </video>
    </VideoBoxWrap>
  );
};

export default VideoBox;
