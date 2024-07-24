import { styled } from 'styled-components';
import { StepItem, StepItemMini } from './StepItem';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const StepWrap = styled.section`
  ${flexPos('center')}
`;

const Step = () => {
  return (
    <StepWrap>
      <StepItem
        title="step 1"
        content="Connect wallet to create account"
        logo={require('@img/product/icon-step-1.png')}
      />

      <Image priority className="mx-14" src={require('@img/home/icon-arrow.svg')} alt="" />

      <StepItem
        title="step 2"
        content="Download and run the Multiple Node client"
        logo={require('@img/product/icon-step-2.png')}
      />

      <Image
        priority
        className="mx-14 w-95"
        src={require('@img/product/icon-product-line.png')}
        alt=""
      />

      <div>
        <StepItemMini
          content="Contribute bandwidth resources to start mining"
          logo={require('@img/product/icon-step-3.png')}
        />

        <StepItemMini
          className="mt-108"
          content="Using file storage and file transfer services"
          logo={require('@img/product/icon-step-4.png')}
        />
      </div>
    </StepWrap>
  );
};

export default Step;
