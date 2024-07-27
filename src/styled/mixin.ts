import { css } from 'styled-components';

type TFlex = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center';
/**
 * flex布局
 * @param justifyContent x轴
 * @param alignItems y轴
 */
export const flexPos = (justifyContent: TFlex = 'center', alignItems: TFlex = 'center') => css`
  display: flex;
  justify-content: ${justifyContent};
  align-items: ${alignItems};
`;

/**
 * 文本颜色渐变
 * @param {*} c1 颜色1
 * @param {*} c2 颜色2
 * @param {*} c3 颜色3
 */
export const flashPoint = (c1: string, c2: string, c3: string) => css`
  @keyframes spotlight {
    0% {
      clip-path: circle(7% at 0% 50%);
      -webkit-clip-path: circle(7% at 0% 50%);
    }
    50% {
      clip-path: circle(7% at 100% 50%);
      -webkit-clip-path: circle(7% at 100% 50%);
    }
    100% {
      clip-path: circle(7% at 0% 50%);
      -webkit-clip-path: circle(7% at 0% 50%);
    }
  }

  background-image: linear-gradient(to right, ${c1}, ${c2}, ${c3});
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  position: relative;
  z-index: 10;
  animation-name: spotlight;
  animation-duration: 5s;
  animation-iteration-count: 5;
  animation-timing-function: ease-in-out;
`;

/**
 * 多行溢出打点
 * 参数：行数，n行，默认2行
 * eg：@include overDots(3);
 */
export const overDots = (n: number = 2) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${n}; //行数
  -webkit-box-orient: vertical;
`;
