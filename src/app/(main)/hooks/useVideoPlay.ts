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
  useEffect(() => {
    videoRef.current.videoRef.current.play();
  }, []);

  return {
    targetRef,
    videoRef,
  };
};
