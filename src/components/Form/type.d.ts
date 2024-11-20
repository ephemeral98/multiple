export enum EType {
  updateInput = 'UPDATE_INPUT', // 更新输入框
  loading = 'LOADING', // 加载中
}

export type TTrigger = 'submit' | 'blur';

export interface IPayload {
  name: string;
  value: string; // 值
  isRequired: string | undefined; // 是否必填
  validRules: {
    fn: ((value: string) => string | true) | undefined;
    val: boolean;
  };
  message: string; // 错误消息等
}

interface IStateVal<T> extends Omit<IPayload, 'name'> {
  name: T;
}

export interface IState {
  [key: string]: IStateVal<`${typeof key}`>;
}
