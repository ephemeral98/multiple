import { ReactNode, CSSProperties } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';

interface IProps {
  title: string;
  children: ReactNode;
  face: string;
  reverseBg: boolean;
  style?: CSSProperties;
  className?: string;
}
const AdvantagesItemWrap = styled.div<{ $reverseBg: boolean }>`
  padding: 28rem 20rem 20rem 37rem;
  border-radius: 10rem;
  background-image: ${(props) =>
    props.$reverseBg
      ? `linear-gradient(134deg, #000 30%, #303030 100%);`
      : `linear-gradient(134deg, #303030 0%, #000 100%);`};

  border: 1px solid #3c3c3c;
  height: 299rem;
`;

const AdvantagesItem = (props: IProps) => {
  return (
    <AdvantagesItemWrap $reverseBg={props.reverseBg} className={props.className}>
      <div className="text-24 font-bold">{props.title}</div>
      {props.children}
      <div className="mt-38 flex justify-end">
        <Image className="w-140" src={props.face} alt="" />
      </div>
    </AdvantagesItemWrap>
  );
};

export default AdvantagesItem;
