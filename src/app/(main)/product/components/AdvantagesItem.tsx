import { ReactNode, CSSProperties } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import useAppStore from '@/store/appStore';

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
  @media (max-width: 750px) {
    height: auto;
    min-height: 390rem;
    padding: 46rem;
    line-height: 1.5;
  }
`;

const AdvantagesItem = (props: IProps) => {
  const appStore = useAppStore();

  return (
    <AdvantagesItemWrap
      $reverseBg={appStore.curDevice !== 'phone' && props.reverseBg}
      className={props.className}
    >
      <div className="text-31 md:text-24 font-bold">{props.title}</div>
      {props.children}
      <div className="mt-21 md:mt-38 flex justify-end">
        <Image className="w-154 md:w-140" src={props.face} alt="" />
      </div>
    </AdvantagesItemWrap>
  );
};

export default AdvantagesItem;
