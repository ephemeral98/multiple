import React, { InputHTMLAttributes, useEffect, useMemo } from 'react';
import { EType } from './type.d';
import { useFormContext } from './useFormProvider';
import { useFormState } from './useForm';

interface IProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  placeHolder?: string;
  isRequired?: string; // 是否输入框可以不填？传递的值是：当不填写的的时候可作为提示
  name: string;
  rules?: (value: string) => string | true; // 规则，返回true才可以提交表单
}
const Input = (props: IProps) => {
  const { state, dispatch } = useFormContext();
  const { requiredMsg, permitRuleItem } = useFormState(state, dispatch);

  /**
   * 输入框输入的时候触发
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: EType.updateInput,

      payload: {
        name: props.name,
        value: e.target.value,
        isRequired: props.isRequired,
        validRules: { fn: props.rules, val: true },
        message: '',
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: EType.updateInput,
      payload: {
        name: props.name,
        value: '',
        isRequired: props.isRequired,
        validRules: { fn: props.rules, val: true },
        message: '',
      },
    });
  }, []);

  // 错误提示
  const errTips = useMemo(() => {
    for (const key in state) {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        const item = state[key];
        if (key === props.name) {
          return item.message;
        }
      }
    }
  }, [state]);

  return (
    <>
      <input
        onBlur={() => {
          const resp = requiredMsg(props.name);
          if (resp) {
            return;
          }
          permitRuleItem(props.name);
        }}
        className={props.className}
        name={props.name}
        type={props.type || 'text'}
        placeholder={props.placeHolder}
        style={{ ...props.style }}
        value={props.value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          props.onChange(e);
          handleInputChange(e);
        }}
      />
      <div className="text-#FF6C4C mt-12 text-20 text-14">{String(errTips)}</div>
      {/* <div>{JSON.stringify(state)}</div> */}
    </>
  );
};

export default Input;
