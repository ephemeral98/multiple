import {
  useCallback,
  useEffect,
  useState,
  useRef,
  useReducer,
  DispatchWithoutAction,
  MutableRefObject,
} from 'react';
import clipboard from 'clipboard';

import { bpThrottle } from './useDeb';
import { Message } from '@arco-design/web-react';
import { isClient } from '@/utils';

/**
 * 类似vue的nextTick，页面渲染前的临门一脚
 * @param callBack
 */
export const useNextTick = (callBack: () => void) => {
  useEffect(() => {
    setTimeout(() => {
      callBack();
    }, 0);
  }, []);
};

/**
 * 获取同步值的函数
 * @param callback 回调函数
 */
export const useSyncCallback = (callback: () => void) => {
  const [proxyState, setProxyState] = useState({ current: false });

  const Func = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
  }, [proxyState]);

  useEffect(() => {
    proxyState.current && callback();
  }, [proxyState]);

  return Func;
};

/**
 * 立即更新状态
 */
export const useUpdateRef = <T>(val: T): [MutableRefObject<T>, DispatchWithoutAction] => {
  const valState = useRef(val);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  return [valState, forceUpdate];
};

/**
 * 获取前一个状态
 * @param val
 * @returns
 */
export const usePrevRef = <T>(val: T): [MutableRefObject<T>, MutableRefObject<T>] => {
  const valState = useRef(val);
  const oldState = useRef(val);

  useEffect(() => {
    oldState.current = valState.current;
  }, [valState]);

  return [valState, oldState];
};

/**
 * 是否在顶部
 * @returns
 */
export const useAtTop = (cb?: (isTop?: boolean) => void) => {
  const [atTop, setAtTop] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const target = ref.current?.getBoundingClientRect();
    console.log('target...', target);

    if (ref.current) {
      if (target!.top > 0) {
        setAtTop(false);
      } else {
        setAtTop(true);
      }
    }
  };

  useEffect(() => {
    if (ref.current) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    cb && cb(atTop);
  }, [atTop]);

  return {
    atTop,
    targetRef: ref,
  };
};

/**
 * 获取元素所在方位
 * @returns
 */
export const useEleScrollWay = ({
  onChange,
  onScroll,
  scrollThrottleTime,
}: {
  onChange?: (info: DOMRect) => void;
  onScroll?: (info: DOMRect) => void;
  scrollThrottleTime?: number;
}) => {
  const [atTop, setAtTop] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<DOMRect>({} as any);

  const handleScroll = () => {
    const target = ref.current?.getBoundingClientRect();
    target && (targetRef.current = target);
    onScroll && onScroll(targetRef.current);

    if (ref.current) {
      if (target!.top > 0) {
        setAtTop(false);
      } else {
        setAtTop(true);
      }
    }
  };

  const doScroll = bpThrottle(handleScroll, scrollThrottleTime);

  useEffect(() => {
    if (ref.current) {
      if (scrollThrottleTime) {
        window.addEventListener('scroll', doScroll);
      } else {
        window?.addEventListener('scroll', handleScroll);
      }
    }
    return () => {
      if (scrollThrottleTime) {
        window.removeEventListener('scroll', doScroll);
      } else {
        window?.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    onChange && onChange(targetRef.current);
  }, [atTop]);

  return {
    atTop,
    targetRef: ref,
  };
};

/**
 * 复制操作
 * 将需要的 className = 'cpy-btn'
 * 需要在 确保能获取到DOM 的生命周期中调用，比如 onMounted
 */
export const useCopy = () => {
  const cpyer = new clipboard('.copy-btn');

  useEffect(() => {
    if (!isClient()) {
      return;
    }
    cpyer.on('success', (e) => {
      Message.success('Copy successful');

      e.clearSelection();
    });

    return () => {
      cpyer.destroy();
    };
  }, []);
};
