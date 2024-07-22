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
  padding: 37rem 146rem;
  border-radius: 19rem;
  border: solid 1px #fff;
  color: #fff;
  font-size: 27rem;
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
