import React, { createContext, useContext, useState } from 'react';
import { EType, IPayload, IState, TTrigger } from './type.d';

/**
 * 创建表单上下文数据
 */
export const FormContext = createContext<{
  trigger: TTrigger;
  state: IState;
  dispatch: (payload: { type: EType; payload: IPayload }) => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  trigger: 'submit',
  state: {},
  loading: false,
  setLoading: () => {},
  dispatch: (payload) => {},
});

export const useFormContext = () => {
  return useContext(FormContext);
};
