'use client';

import { styled } from 'styled-components';
import { FC, useState } from 'react';
import Image from 'next/image';
import Form from '@/components/Form';
import { $fontSize, $height, $width } from '@/styled/mediaSize';
import Waiting from '@/components/Waiting';
import { isAddress } from '@/contracts/tools';

interface IBuyNftPop {
  onClose: () => void;
  onBuy: (recipientAddr: string) => void;
  loadBuyNft: boolean;
}

const BuyNftPopWrap = styled.div`
  background-color: #1a1d1f;
  ${$width('90%', '591rem', '591rem')}
  /* height: 671rem; */
  padding-bottom: 61rem;
  border-radius: 24rem;
  position: relative;

  .addr-inp {
    width: 504rem;
    /* ${$width('90%', '504rem', '504rem')} */
    ${$height('82rem', '72rem', '72rem')}
    border-radius: 20rem;
    border: solid 1px #d9d9d9;
    margin: 0 auto;
    padding: 0 24rem;
    ${$fontSize('24rem', '16rem', '16rem')}
    color: #fff;
  }

  .form-btn {
    width: 370rem;
    ${$height('82rem', '70rem', '70rem')}
    ${$fontSize('24rem', '16rem', '16rem')}
    border-radius: 10rem;
    /* margin: 0 auto; */

    &.submit-btn {
      background-color: #fff;
      color: #1a1d1f;
      /* margin-top: 46rem; */
    }

    &.cancel-btn {
      border: solid 1rem #fff;
      margin: 32rem auto 0;
    }
  }
`;

const BuyNftPop: FC<IBuyNftPop> = (props) => {
  const [addrInp, setAddrInp] = useState('');

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

      <div className="flex-center pt-32 text-28 md:text-20">Buy NFTs</div>

      <section className="text-center mt-67 px-28">
        <div>Price</div>
        <div className="text-26 md:text-24 font-bold mt-16">1200USDT</div>
        <div className="mt-45 mb-24 flex-center">
          <div className="text-20 md:text-16">Promotion code (optional)</div>
          {/* <Image
            className="w-20 md:w-16 ml-11 cursor-pointer"
            priority
            src={require('@img/common/icon-query.png')}
            alt=""
            onClick={() => {
              console.log('click');
            }}
          /> */}
        </div>

        <Form.Wrap
          onError={(err) => {
            console.log('这里可以获取错误消息, true则是无错误', err);
            if (err !== true) {
              // window.alert(err);
            }
          }}
          onSubmit={async () => {
            if (props.loadBuyNft) {
              return;
            }
            // 如果rules规则不通过 或者 isRequired不通过，则不会触发这个callback
            props.onBuy(addrInp?.trim?.());
          }}
        >
          <Form.Inp
            className="addr-inp"
            // isRequired="Please enter wallet address" // 这里可设置必填，value是提示
            name="one" // name不要写相同的
            value={addrInp}
            onChange={(e) => setAddrInp(e.target.value)}
            rules={(value) => {
              if (!value) {
                return true;
              }
              const isAddr = isAddress(value?.trim?.());
              return !isAddr
                ? '*The wallet address you entered is not a valid discount code, please re-enter!'
                : true;

              if (!/^\d+/.test(value)) {
                return '*The wallet address you entered is not a valid discount code, please re-enter!';
              }

              return true; // 必须只有 严格return true 才会通过规则
            }}
          />

          <Waiting width='370rem' style={{ margin: '46rem auto 0' }} isLoading={props.loadBuyNft}>
            <Form.Btn className="form-btn submit-btn">BUY NOW</Form.Btn>
          </Waiting>

          {/* <button onClick={() => props.onClose()} type="button" className="form-btn cancel-btn">
            Cancel
          </button> */}
        </Form.Wrap>
      </section>
    </BuyNftPopWrap>
  );
};

export default BuyNftPop;
