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
  position: relative;
  /* background-image: url('/static/bg-active-advantages.png');
  background-size: cover; */
  /* background-position: -10rem 0rem; */

  /* border: 1px solid #3c3c3c; */
  border: solid 1px #98AEFF;
  height: 299rem;
  @media (max-width: 750px) {
    height: auto;
    min-height: 390rem;
    padding: 46rem;
    line-height: 1.5;
  }

  .active-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
  }
  &:hover {
    .active-mask {
      opacity: 1;
    }
  }
`;

const AdvantagesItem = (props: IProps) => {
  const appStore = useAppStore();

  return (
    <AdvantagesItemWrap
      $reverseBg={appStore.curDevice !== 'phone' && props.reverseBg}
      className={props.className}
    >
      <Image className="active-mask" src={require('@img/home/bg-active-advantages.png')} alt="" />

      <div className="text-31 md:text-24 font-bold relative z-9">{props.title}</div>
      <div className="relative z-9">{props.children}</div>
      <div className="absolute right-18 bottom-10">
        <Image className="w-154 md:w-140" src={props.face} alt="" />
      </div>
    </AdvantagesItemWrap>
  );
};

export default AdvantagesItem;
