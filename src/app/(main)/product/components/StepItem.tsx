import { FC } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const StepItemWrap = styled.div`
  width: 334rem;
  height: 207rem;
  padding: 24rem;
  position: relative;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #ffffff;
`;

export const StepItem: FC<{
  title: string;
  content: string;
  logo: string;
  className?: string;
}> = ({ title, content, logo, className }) => {
  return (
    <StepItemWrap className={className}>
      <div className="text-24 font-bold">{title}</div>
      <div className="text-16 mt-5 leading-[1.5]">{content}</div>

      <Image priority className="w-59 absolute right-30 bottom-14" src={logo} alt="" />
    </StepItemWrap>
  );
};

const StepItemMiniWrap = styled.div`
  width: 296rem;
  height: 99rem;
  padding: 25rem 14rem;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #ffffff;
  line-height: 1.5;
  ${flexPos('center')}
`;

export const StepItemMini: FC<{
  content: string;
  logo: string;
  className?: string;
}> = ({ content, logo, className }) => {
  return (
    <StepItemMiniWrap className={className}>
      <Image priority className="w-45 mr-14" src={logo} alt="" />

      <div className="text-16">{content}</div>
    </StepItemMiniWrap>
  );
};
