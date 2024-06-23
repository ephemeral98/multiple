import { useInViewport } from 'ahooks';
import { useEffect, useRef } from 'react';
// export const useVideoPlay = () => {
//   const videoList = [
//     {
//       ref: useRef<any>(null),
//     },
//   ];
// };

export const useVideoPlay = () => {
  const targetRef = useRef<any>(null);
  const videoRef = useRef<any>();
  const [inViewport] = useInViewport(targetRef);
  useEffect(() => {
    if (inViewport) {
      if (!videoRef.current.isEnd) {
        // 如果之前没有播放完，继续播放
        videoRef.current.videoRef.current.play();
      }
    } else {
      videoRef.current.videoRef.current.pause();
    }
  }, [inViewport]);

  return {
    targetRef,
    videoRef,
  };
};
