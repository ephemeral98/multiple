import { useCallback, useEffect, useMemo, useState, ComponentType, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { TRenderReturn, destroy, getUniqueId, useUpdateEffect } from './utils';

import { getWrapperInstance, injectToggle, noop, render } from './utils';
import { idCache, showCache, defaultRoot } from './state';
import { IOption, TShowProps } from './types';
import css from './index.module.css';
import React from 'react';

/**
 * 用于控制弹窗显示隐藏的hook
 * @example
 * const { open } = useModal(YourModal, {
 *  props: {} // 组件的props
 *  animate: { // 过度动画，(可利用animate.css的动画)
      enterActive: 'animate__animated animate__flip',
      exitActive: 'animate__animated animate__fadeOutRight',
    },
 * })
 *
 * 最好不要直接传入一个匿名函数作为组件，不然没法缓存就会照成不断生成
 */
export function useModal<P>(ModalComponent: ComponentType<P>, options: IOption<P> = noop) {
  const { root } = options;

  const vComp = useRef<TRenderReturn>(); // 挂在的组件

  // 获取唯一的modalId, 并放入缓存
  const modalId = useMemo(() => {
    const cached = idCache.get(ModalComponent);
    if (!cached) {
      const _id = getUniqueId();
      idCache.set(ModalComponent, _id);
      return _id;
    }
    return cached;
  }, []);

  const [show, setShow] = useState(Boolean(showCache.get(modalId))); // 弹窗是否显示
  const [isUnmount, setUnmount] = useState(false); // 是否已卸载组件
  // const isUnmount = useRef(false);
  const compRef = useRef(null);

  const mounted = () => {
    options.onMounted?.();
  };

  /**
   * 弹窗已关闭的回调
   */
  const animationEnd = () => {
    if (options.destroy) {
      setTimeout(() => {
        destroy(vComp.current!, modalId, root || defaultRoot, ModalComponent);
      }, 0);
    }
    // isUnmount.current = true;
    setUnmount(true);
    options.onUnmounted?.();
  };

  // 包裹的外层动画组件
  const CompWrapper = (props: { show: boolean } & P) => {
    return (
      <CSSTransition
        nodeRef={compRef}
        in={props.show}
        timeout={options.animate ? 1000 : 0}
        classNames={options.animate}
        unmountOnExit={options.unmountOnExit}
        onEntered={() => {
          mounted();
        }}
        onExited={() => {
          animationEnd();
          const father = document.getElementById(modalId);
          father!.style.display = 'none';
        }}
      >
        {React.cloneElement(
          <div
            className={`${options?.className} ${css['modal-wrapper']} ${
              css[options.dir || 'center']
            }`}
          >
            <ModalComponent {...props}></ModalComponent>
          </div>,
          { ref: compRef }
        )}
      </CSSTransition>
    );
  };

  /**
   * 已经渲染有实例，仅控制显示隐藏
   */
  const showIfHasInstance = useCallback(
    (isOpen: boolean, config = noop) => {
      const instance = getWrapperInstance(modalId);
      const father = document.getElementById(modalId);
      father!.style.display = 'block';

      instance?.setState(
        (prev: TRenderReturn) => ({
          ...prev,
          ...options.props,
          ...config,
          toggle: injectToggle<P>(modalId, () => {
            showCache.set(modalId, false);
            setShow(false);
          }),
          show: isOpen,
          unmount: isUnmount,
        }),
        () => {
          showCache.set(modalId, instance.state.show);
          setShow(instance.state.show);
        }
      );
    },
    [options.props, modalId, isUnmount]
  );

  // 更新props
  useUpdateEffect(() => {
    if (!show) {
      return;
    }
    const instance = getWrapperInstance(modalId);

    instance?.setState(
      (prev: P) => ({
        ...prev,
        ...options.props,
      }),
      () => {}
    );
  }, [options.props]);

  /**
   * 控制显示渲染和隐藏
   */
  const handleRenderShow = useCallback(
    (config: any = noop) => {
      const hasRender = document.getElementById(modalId) !== null;

      if (!hasRender) {
        vComp.current = render<P>(
          CompWrapper as ComponentType<P>,
          modalId,
          root || defaultRoot,
          {
            ...options.props,
            ...config,
            toggle: injectToggle(modalId, () => {
              showCache.set(modalId, false);
              setShow(false);
            }),
            onClose: () => {
              close();
            },
            modalId,
          },
          () => {
            const instance = getWrapperInstance(modalId);
            const father = document.getElementById(modalId);
            father!.style.display = 'block';

            instance?.setState(
              (prev: TShowProps<P>) => ({
                ...prev,
                ...options.props,
                ...config,
                toggle: injectToggle(modalId, () => {
                  showCache.set(modalId, false);
                  setShow(false);
                }),
                show: true,
              }),
              () => {
                showCache.set(modalId, instance.state.show);
                setShow(instance.state.show);
              }
            );
          },
          options.maskColor
        );
      } else {
        showIfHasInstance(true, config);
      }
    },
    [options.props, modalId, showIfHasInstance]
  );

  // 首次渲染挂载
  useEffect(() => {
    const hasRender = document.getElementById(modalId) !== null;
    if (hasRender) {
      return;
    }
    vComp.current = render<P>(
      CompWrapper as ComponentType<P>,
      modalId,
      root || defaultRoot,
      {
        ...options.props,
        toggle: injectToggle(modalId, () => {
          showCache.set(modalId, false);
          setShow(false);
        }),
        show: false,
        onClose: () => {
          close();
        },
        modalId,
      } as TShowProps<P>,

      () => {
        setShow(false);
        showCache.set(modalId, true);
      },
      options.maskColor
    );

    return () => {
      if (options.destroy) {
        setTimeout(() => {
          destroy(vComp.current!, modalId, root || defaultRoot, ModalComponent);
        }, 0);
      }
    };
  }, []);

  /**
   * 关闭弹窗
   */
  const close = useCallback(() => {
    showIfHasInstance(false);
  }, [showIfHasInstance]);

  /**
   * 切换
   */
  const toggle = useCallback(
    ({ show, ...args }: { show: boolean; args?: any }) => {
      if (show) {
        handleRenderShow(args);
      } else {
        showIfHasInstance(false);
      }
    },
    [showIfHasInstance]
  );

  return {
    open: handleRenderShow,
    close,
    isOpen: show,
    toggle,
  };
}
