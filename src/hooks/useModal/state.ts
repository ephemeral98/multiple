import { ComponentType } from 'react';
import { IWrapperInstance } from './types';

export const idCache = new WeakMap<ComponentType<any>, string>(); // 缓存组件与之id

export const showCache = new Map<string, boolean>(); // 缓存id与之是否显示状态

export const idArr: number[] = []; // 已存在的id，为了获取独一无二的id

export const instanceCache = new Map<string, IWrapperInstance<any>>(); // 缓存id和实例

let _defaultRoot: string = '#root'; // 挂在的节点
/**
 * 设置挂载的根节点
 */
export function setRoot(_root: string) {
  _defaultRoot = _root;
}

export const defaultRoot = _defaultRoot;
