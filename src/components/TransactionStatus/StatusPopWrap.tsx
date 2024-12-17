'use client';

import { styled } from 'styled-components';
import { FC, ReactNode, useState } from 'react';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

interface IBuyNftPop {
  onClose: () => void;
  children: ReactNode;
}

const StatusPopWrap = styled.div`
  width: 495rem;
  background-color: #1a1a1a;
  ${flexPos('center')}
  flex-direction: column;
  position: relative;
  padding: 27rem 0 31rem;

  .icon-close {
    position: absolute;
    right: 26rem;
    top: 26rem;
    width: 14rem;
    height: 14rem;
    cursor: pointer;
  }
`;

const StatusPop: FC<IBuyNftPop> = (props) => {
  return (
    <StatusPopWrap>
      <Image
        priority
        className="icon-close"
        src={require('@img/common/icon-close.svg')}
        alt=""
        onClick={() => props.onClose()}
      />

      {props.children}
    </StatusPopWrap>
  );
};

export default StatusPop;
