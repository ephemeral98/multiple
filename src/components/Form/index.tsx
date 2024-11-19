import React, {
  useReducer,
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react';
import Input from './Input';
import Btn from './Btn';
import { FormContext } from './useFormProvider';
import { useFormState, formReducer } from './useForm';
import { TTrigger } from './type.d';

interface IProps {
  children: React.ReactNode;
  onSubmit?: () => void; // 提交表单
  onError?: (status: string | true) => void; // 校验失败的时候触发
  trigger?: TTrigger; // 校验触发时机，默认是提交的时候触发
}
const Form = forwardRef((props: IProps, ref: ForwardedRef<HTMLFormElement>) => {
  const [state, dispatch] = useReducer(formReducer, {});
  const { validResp } = useFormState(state, dispatch);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>();

  useImperativeHandle<HTMLFormElement, any>(ref, () => ({
    // 手动校验
    handleValid: () => {
      return validResp();
    },
  }));

  return (
    <FormContext.Provider
      value={{
        trigger: props.trigger ?? 'submit',
        loading,
        setLoading,
        state,
        dispatch,
      }}
    >
      <form
        ref={formRef as ForwardedRef<HTMLFormElement>}
        action=""
        onSubmit={async (e) => {
          e.preventDefault();
          const resp = validResp();
          if (resp === true) {
            if (loading) {
              return;
            }
            setLoading(true);
            await props.onSubmit?.();
            setLoading(false);
          } else {
            props.onError?.(resp);
          }
        }}
      >
        {props.children}
      </form>
    </FormContext.Provider>
  );
});

export default {
  Wrap: Form,
  Inp: Input,
  Btn: Btn,
};
