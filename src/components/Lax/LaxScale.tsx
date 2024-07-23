// src/components/LaxWrapper.js
import React, { ReactNode, useEffect } from 'react';
// @ts-ignore
import lax from 'lax.js';
import { isClient } from '@/utils';
import { styled } from 'styled-components';

interface IProps {
  children: ReactNode;
}

const LaxScaleWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
`;

const LaxScale = ({ children }: IProps) => {
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

    // 组件卸载时移除驱动
    return () => {
      lax.removeElements('.lax-scale');
      lax.removeDriver('scrollY');
    };
  }, []);

  return <LaxScaleWrap className="lax-scale">{children}</LaxScaleWrap>;
};

export default LaxScale;
