'use client';

import { styled } from 'styled-components';
import { FC } from 'react';
import Image from 'next/image';

interface IBuyNftPop {
  onClose: () => void;
}

const BuyNftPopWrap = styled.div`
  background-color: #1a1d1f;
  width: 591rem;
  height: 671rem;
  border-radius: 24rem;
  position: relative;
`;

const BuyNftPop: FC<IBuyNftPop> = (props) => {
  return (
    <BuyNftPopWrap>
      <Image
        className="absolute w-20 top-36 right-36 cursor-pointer"
        priority
        src={require('@img/common/icon-pop-close.png')}
        alt=""
        onClick={() => {
          props.onClose();
        }}
      />
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa, facilis?
    </BuyNftPopWrap>
  );
};

export default BuyNftPop;
