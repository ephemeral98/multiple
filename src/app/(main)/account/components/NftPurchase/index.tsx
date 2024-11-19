'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import Rules from './Rules';
import { useModal } from '@/hooks/useModal';
import BuyNftPop from './BuyNftPop';

const NftPurchaseWrap = styled.div`
  width: 1100rem;

  .inp {
    width: 63rem;
    font-size: 24rem;
    border: none;
    text-align: center;
    color: #fff;
    margin: 0 5rem;
  }

  .buy-btn {
    width: 370rem;
    height: 70rem;
    border-radius: 10rem;
    background-color: #fff;
    font-size: 16rem;
    margin-top: 105rem;
    color: #000;
  }
`;

const NftPurchase: React.FC = () => {
  const { open } = useModal(BuyNftPop, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  return (
    <NftPurchaseWrap>
      <div className="font-bold mb-31 text-24">Purchase NFT</div>

      <section className="flex mb-72">
        <div className="w-351 h-351 rounded-10rem px-12">
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
          <div className="font-bold text-24">
            <span>Multiple NFT </span>
            <span className="ml-20">#23321</span>
          </div>
          <div className="flex-center mt-45">
            <div className="mr-54">
              <div>Price</div>
              <div className="mt-8 text-24">
                <span>12300</span>
                <span className="text-17 ml-8">USDT</span>
              </div>
            </div>

            <div>
              <div>Quantity</div>
              <div className="flex-center mt-8">
                <Image
                  className="w-20 cursor-pointer"
                  priority
                  src={require('@img/common/icon-sub.png')}
                  alt=""
                  onClick={() => {
                    console.log('click');
                  }}
                />

                <input type="text" className="inp" />

                <Image
                  className="w-20 cursor-pointer"
                  priority
                  src={require('@img/common/icon-plus.png')}
                  alt=""
                  onClick={() => {
                    console.log('click');
                  }}
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
