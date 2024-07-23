import { Message } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import styled from 'styled-components';

interface IPropsStartBtn {
  style?: CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const ButtonWrap = styled.button`
  border-radius: 4rem;
  border: solid 1px #fff;
  color: #fff;
  font-size: 14rem;
  padding: 16rem 24rem;
  transition: all 0.4s;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;
const Button = (props: IPropsStartBtn) => {
  return (
    <ButtonWrap
      style={props.style}
      className={props.className}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        } else {
          Message.normal('Coming Soon...');
        }
      }}
    >
      {props.children}
    </ButtonWrap>
  );
};

export default Button;
