import { FC } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { $height, $width, phoneSize } from '@/styled/mediaSize';

const StepItemWrap = styled.div`
  ${$width('448rem', '334rem', '334rem')}
  ${$height('196rem', '207rem', '207rem')}
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
      <div className="text-27 md:text-24 font-bold">{title}</div>
      <div className="text-23 md:text-16 mt-5 leading-[1.5]">{content}</div>

      <Image priority className="w-56 md:w-59 absolute right-30 bottom-14" src={logo} alt="" />
    </StepItemWrap>
  );
};

const StepItemMiniWrap = styled.div`
  ${$width('310rem', '296rem', '296rem')}
  ${$height('179rem', '99rem', '99rem')}
  padding: 25rem 14rem;
  border-radius: 10px 10px 10px 10px;
  border: 1px solid #ffffff;
  line-height: 1;
  ${flexPos('center')}

  @media (max-width: ${phoneSize}) {
    flex-direction: column;
    ${flexPos('flex-start', 'flex-start')}
    padding: 27rem 14rem;
  }
`;

export const StepItemMini: FC<{
  content: string;
  logo: string;
  className?: string;
}> = ({ content, logo, className }) => {
  return (
    <StepItemMiniWrap className={className}>
      <Image priority className="w-45 mr-14" src={logo} alt="" />

      <div className="text-23 md:text-16 mt-12 md:mt-0">{content}</div>
    </StepItemMiniWrap>
  );
};
