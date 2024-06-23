import React, { CSSProperties, ComponentType, DependencyList, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Root, TShowProps } from './types';
import WrapperComponent from './WrapperComponent';
import { idCache, showCache, idArr, instanceCache } from './state';

/**
 * 获取唯一id
 */
export const getUniqueId = (): string => {
  const max = idArr.length ? Math.max(...idArr) : 0;
  idArr.push(max + 1);
  return `useModal__${max + 1}`;
};

/**
 * 获取根元素
 * @param root
 */
export function getRoot(root: Root = '#root') {
  if (typeof root === 'string') {
    return document.querySelector(root) as HTMLElement;
  } else if (root instanceof HTMLElement) {
    return root;
  }
  return root();
}

/**
 * 渲染
 * @param ModalComponent 弹窗组件
 * @param modalId
 * @param root
 * @param props
 * @param callback
 * @returns
 */
export function render<P>(
  ModalComponent: ComponentType<P>,
  modalId: string,
  root: Root,
  props: TShowProps<P> = noop,
  callback: () => void,
  maskColor?: string,
) {

  // 创建最外层包裹元素
  const target = document.createElement('div');
  target.style.zIndex = '99999';
  target.id = modalId;
  target.className = 'animate__animated';
  target.style.display = 'none';
  const rootDom = getRoot(root);
  rootDom.appendChild(target);
  const Component = ModalComponent as ComponentType<any>;

  const createrRoot = createRoot(target);
  // 由于这里不是hook，所以用class component包一层获取ref的实例
  createrRoot.render(
    <WrapperComponent
      {...props}
      show={props.show}
      maskColor={maskColor}
      ref={(instance) => {
        instanceCache.set(modalId, instance!);
        callback();
      }}
    >
      <Component />
    </WrapperComponent>
  );

  return createrRoot;
}

export type TRenderReturn = ReturnType<typeof render>;

/**
 * 整个 销毁组件 并清除缓存
 * (会导致的问题就是使id错乱，导致弹窗上的弹窗在取消的时候出错)
 * (目前还用不上，还不知道什么情况下会用，先留着)
 * @param vComp
 * @param id
 * @param root
 */
export const destroy = <P extends unknown>(
  vComp: TRenderReturn,
  id: string,
  root: Root,
  comp: ComponentType<P>
) => {
  vComp.unmount?.();
  const rootDom = getRoot(root);
  const target = document.getElementById(id);
  target && rootDom.removeChild(target!);
  instanceCache.delete(id);
  idCache.delete(comp);
  showCache.delete(id);
  const targetIdInx = idArr.findIndex((it) => it === +id.replace('useModal__', ''));
  idArr.splice(targetIdInx, 1);
};

/**
 * 获取实例
 * @param id
 */
export function getWrapperInstance(id: string) {
  return instanceCache.get(id)!;
}

// 无原型空对象
export const noop = Object.create(null);

/**
 * 设置数据状态
 * @param id
 * @param callback
 * @returns
 */
export function injectToggle<P>(id: string, callback: () => void) {
  return function () {
    const instance = getWrapperInstance(id);
    instance.setState(
      (prev: P) => ({
        ...prev,
        show: false,
      }),
      () => {
        callback();
      }
    );
  };
}

/**
 * 首次不执行的useEffect
 * @param cb
 * @param deps
 */
export const useUpdateEffect = (cb: () => void, deps: DependencyList) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      cb();
    }
  }, deps);
};
