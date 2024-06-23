import { CSSProperties } from 'styled-components';

export type Flatten<T> = {
  [K in keyof T]: T[K];
};

export type Root = string | (() => HTMLElement);

export interface IOption<P> {
  root?: string; // 挂在的根节点
  props?: Omit<P, 'onClose'>; // 参数
  destroy?: boolean; // 点击关闭的时候整个销毁（目前还不建议使用）
  unmountOnExit?: boolean; // 是否在组件销毁的时候移除DOM
  animate?: {
    // 相关动画，可直接使用 animate.css 的class
    enterActive: string;
    exitActive: string;
  };
  maskColor?: string;
  className?: string;
  dir?: 'top' | 'bottom';
  id?: string; // 挂到 modal-main 上的id
  onMounted?: () => void; // 弹窗打开之后的回调
  onUnmounted?: () => void; // 弹窗已关闭的回调
}

export interface IWrapperInstance<P> {
  setState: any;
  state: P;
}

export type TShowProps<P> = {
  show: boolean;
  toggle: () => void;
  onClose?: () => void;
  modalId: string;
} & P;
