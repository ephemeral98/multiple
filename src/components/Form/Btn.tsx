import React from 'react';
// import { useFormContext } from './useFormProvider';

interface IProps {
  className?: string;
  style?: React.CSSProperties;
  type?: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
}
const Btn = (props: IProps) => {
  // const { loading } = useFormContext();

  return (
    <button className={props.className} type={props.type ?? 'submit'} style={{ ...props.style }}>
      {props.children}
    </button>
  );
};

export default Btn;
