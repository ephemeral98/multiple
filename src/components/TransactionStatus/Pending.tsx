'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { RingStyle } from './RingStyle';
import StatusPop from './StatusPopWrap';

interface IBuyNftPop {
  onClose: () => void;
}

const Pending: FC<IBuyNftPop> = (props) => {
  return (
    <StatusPop onClose={() => props.onClose()}>
      <RingStyle>
        <Image priority className="w-full spin" src={require('@img/common/icon-pending.png')} alt="" />
      </RingStyle>

      <div className="mt-30 text-18">Transaction Pending</div>
      <div className="text-10 mt-5">Please wait for the transaction to complete.</div>
    </StatusPop>
  );
};

export default Pending;
