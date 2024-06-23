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
