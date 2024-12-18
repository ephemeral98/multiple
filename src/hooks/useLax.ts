// @ts-ignore
import lax from 'lax.js';
import { isClient } from '@/utils';
import { useEffect } from 'react';

export const useLax = () => {
  useEffect(() => {
    if (!isClient()) {
      return;
    }

    lax.init(); // 初始化 Lax.js
    lax.addDriver('scrollY', () => window.scrollY); // 添加滚动驱动

    lax.addElements('.lax-scale', {
      scrollY: {
        scale: [
          ['elInY', 'elCenterY', 'elOutY'],
          [1, 1, 0],
        ],
        opacity: [
          ['elInY', 'elCenterY', 'elOutY'],
          [0.5, 0.8, 1],
        ],
      },
    });

    lax.addElements('.lax-bigger', {
      scrollY: {
        scale: [
          ['elInY', 'elCenterY', 'elOutY'],
          [0.45, 0.45, 1],
        ],
      },
    });

    // 组件卸载时移除驱动
    return () => {
      lax.removeElements('.lax-scale');
      lax.removeElements('.lax-bigger');
      lax.removeDriver('scrollY');
    };
  }, []);
};
