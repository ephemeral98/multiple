import { styled } from 'styled-components';
import { StepItem, StepItemMini } from './StepItem';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const StepMobWrap = styled.section`
  ${flexPos('center')}
  flex-direction: column;

  .icon-arrow {
    transform: rotate(90deg);
  }
`;

const StepMob = () => {
  return (
    <StepMobWrap>
      <StepItem
        title="step 1"
        content="Connect wallet to create account"
        logo={require('@img/product/icon-step-1.png')}
      />

      <Image
        priority
        className="icon-arrow mx-48 my-48"
        src={require('@img/home/icon-arrow.svg')}
        alt=""
      />

      <StepItem
        title="step 2"
        content="Download and run the Multiple Node client"
        logo={require('@img/product/icon-step-2.png')}
      />

      <Image
        priority
        className="w-185 icon-arrow mt-[-80rem]"
        src={require('@img/product/icon-product-line.png')}
        alt=""
      />

      <div className="flex-center mt-[-80rem]">
        <StepItemMini
          content="Contribute bandwidth resources to start mining"
          logo={require('@img/product/icon-step-3.png')}
        />

        <StepItemMini
          className="ml-54"
          content="Using file storage and file transfer services"
          logo={require('@img/product/icon-step-4.png')}
        />
      </div>
    </StepMobWrap>
  );
};

export default StepMob;
