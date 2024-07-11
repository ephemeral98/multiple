import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { CSSProperties } from 'react';

const PointWrap = styled.div<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? '#fff' : '#585858')};
  border-radius: 50%;
  ${flexPos('center')}
  transition: all 0.5s;
  position: absolute;

  .point-face {
    width: 30rem;
    height: 30rem;
    opacity: ${(props) => (props.$active ? '1' : '0')};
    transition: all 0.5s;
  }
`;

const Point = (props: { active: boolean; className?: string; style?: CSSProperties }) => {
  return (
    <PointWrap
      className={`w-52 md:w-54 h-52 md:h-54 ${props.className}`}
      $active={props.active}
      style={{ ...props.style }}
    >
      <Image
        priority
        className="point-face"
        src={require('@img/product/icon-point-active.svg')}
        alt=""
      />
    </PointWrap>
  );
};

export default Point;
