'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { RingStyle } from './RingStyle';
import StatusPop from './StatusPopWrap';

interface IBuyNftPop {
  onClose: () => void;
}

const Success: FC<IBuyNftPop> = (props) => {
  return (
    <StatusPop onClose={() => props.onClose()}>
      <RingStyle>
        <Image
          priority
          className="w-87"
          src={require('@img/common/icon-status-success.png')}
          alt=""
        />
      </RingStyle>

      <div className="mt-30 text-18">Transaction Successful</div>
      <div className="text-10 mt-5">Please check your account for details.</div>
    </StatusPop>
  );
};

export default Success;
