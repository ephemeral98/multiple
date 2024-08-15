/**
 * 请求信号
 * @returns
 */
export const requestSignal = () => {
  // 该作用域共享这个取消请求的信号
  let currentController: AbortController, signal: AbortSignal;

  /**
   * 产生取消请求的信号
   */
  function createCancelSignal() {
    const controller = new AbortController();
    currentController = controller;
    signal = controller.signal;
  }

  /**
   * 取消请求封装体
   * @param p1
   * @param signal
   * @param controller
   * @returns
   */
  async function aborter(p1: Promise<any>) {
    createCancelSignal();

    const p2 = new Promise((resolve, reject) => {
      /**
       * 定一个失败的Promise
       */
      function cancelPromise() {
        signal.removeEventListener('abort', cancelPromise);
        return reject('cancel');
      }
      // 监听取消的状态
      if (signal) {
        signal.addEventListener('abort', cancelPromise);
      }
    });

    return await Promise.race([p1, p2]);
  }

  /**
   * 取消请求
   */
  const cancel = (cb?: () => void) => {
    currentController?.abort?.();
    cb?.();
  };

  return {
    aborter,
    cancel,
  };
};
