import { useRef } from 'react';

/**
 * 节流
 * @param callback 回调函数
 * @param duration 节流间隔时间
 * eg: bpThrottle(() => {})
 */
export function bpThrottle(callback: (e: any) => void, duration: number = 70) {
  let throttleTimer: any;
  return (e: any) => {
    if (throttleTimer) return;

    throttleTimer = setTimeout(() => {
      callback(e);
      throttleTimer = null;
    }, duration);
  };
}

/**
 * 防抖
 * @param callback
 * @returns
 */
export function useDebounce() {
  const action = useRef(true);
  const timer = useRef<any>(null);

  function deb(callback: () => void, moveDuration = 1000) {
    if (!action.current) return;
    action.current = false;
    clearInterval(timer.current);

    callback();

    timer.current = setTimeout(() => {
      action.current = true;
      clearInterval(timer.current);
    }, moveDuration);
  }

  return deb;
}
