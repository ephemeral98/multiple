'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import Rules from './Rules';
import { useModal } from '@/hooks/useModal';
import BuyNftPop from './BuyNftPop';
import { useState } from 'react';
import {
  $borderRadius,
  $fontSize,
  $height,
  $marginBottom,
  $marginTop,
  $marginX,
  $width,
  phoneSize,
} from '@/styled/mediaSize';
import useAppStore from '@/store/appStore';

const NftPurchaseWrap = styled.div`
  ${$width('100%', '1100rem', '1100rem')}

  .purchase-info {
    /* flex flex-col md:flex-row mb-72 */
    display: flex;
    ${$marginBottom('87rem', '72rem', '72rem')}

    @media (max-width: ${phoneSize}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .purchase-face {
      ${$width('396rem', '351rem', '351rem')}
      ${$height('396rem', '351rem', '351rem')}
      border-radius: 10rem;
      padding: 12rem;
      border: solid 1px #d9d9d9;
    }

    .purchase-face-info {
      ${$width('396rem', '351rem', '351rem')}
    }
  }

  .inp {
    ${$width('99rem', '63rem', '63rem')}
    ${$fontSize('31rem', '24rem', '24rem')}
    border: none;
    text-align: center;
    color: #fff;
    ${$marginX('8rem', '5rem', '5rem')}
  }

  .buy-btn {
    ${$width('629rem', '370rem', '370rem')}
    ${$height('115rem', '70rem', '70rem')}
    ${$borderRadius('19rem', '10rem', '10rem')}
    ${$fontSize('27rem', '16rem', '16rem')}
    ${$marginTop('123rem', '105rem', '105rem')}
    color: #000;
    background-color: #fff;
  }
`;

const NftPurchase: React.FC = () => {
  const { open } = useModal(BuyNftPop, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const [quantity, setQuantity] = useState('');

  const appStore = useAppStore();

  return (
    <NftPurchaseWrap>
      {appStore.curDevice !== 'phone' && (
        <div className="font-bold mb-31 text-24">Purchase NFT</div>
      )}

      <section className="purchase-info">
        <div className="purchase-face md:mr-33">
          <Image
            className="w-full"
            priority
            src={require('@img/nft/img-nft.png')}
            alt=""
            onClick={() => {
              console.log('click');
            }}
          />
        </div>

        <div>
          <div className="purchase-face-info mx-auto font-bold text-31 md:mt-24 mt-23 md:mt-0 flex justify-between">
            <span>Multiple NFT </span>
            <span className="ml-20">#23321</span>
          </div>
          <div className="flex-center flex-col md:flex-row text-center md:text-start mt-45">
            <div className="md:mr-54">
              <div className="text-23 md:text-14">Price</div>
              <div className="mt-8 text-31 md:text-24">
                <span>12300</span>
                <span className="text-17 ml-8">USDT</span>
              </div>
            </div>

            <div className="mt-62 md:mt-0">
              <div className="text-23 md:text-14 mb-27 md:mb-0">Quantity</div>
              <div className="flex-center mt-8">
                <Image
                  className="w-38 md:w-20 cursor-pointer"
                  priority
                  src={require('@img/common/icon-sub.png')}
                  alt=""
                  onClick={() => {
                    if (+quantity <= 0) {
                      return;
                    }
                    setQuantity(String(+quantity - 1));
                  }}
                />

                <input
                  type="text"
                  className="inp"
                  value={quantity}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const reg = /^[1-9]\d*$/;
                    if (newValue === '' || reg.test(newValue)) {
                      setQuantity(newValue);
                    }
                  }}
                />

                <Image
                  className="w-38 md:w-20 cursor-pointer"
                  priority
                  src={require('@img/common/icon-plus.png')}
                  alt=""
                  onClick={() => setQuantity(String(+quantity + 1))}
                />
              </div>
            </div>
          </div>

          <button className="buy-btn" onClick={() => open()}>
            BUY NOW
          </button>
        </div>
      </section>

      <Rules />
    </NftPurchaseWrap>
  );
};

export default NftPurchase;
