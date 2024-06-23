'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import AdvantagesItem from './components/AdvantagesItem';
import useAppStore from '@/store/appStore';

const ProductWrap = styled.div`
  line-height: 1;

  .product-banner {
    height: 740rem;
    position: relative;

    .product-face {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-title {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 991rem;
      @media (max-width: 750px) {
        width: 100%;
      }

      ${flexPos('center')}
      flex-direction: column;
      text-align: center;
    }

    .download-btn {
      border-radius: 10rem;
      border: solid 1px #fff;
      padding: 27rem 36rem;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      white-space: nowrap;

      @media (max-width: 750px) {
        padding: 37rem 52rem;
        border-radius: 19rem;
      }
    }
  }
`;

const Product = () => {
  const appStore = useAppStore();

  return (
    <ProductWrap>
      <section className="product-banner">
        {appStore.curDevice === 'phone' ? (
          <Image
            className="product-face"
            src={require('@img/product/banner-product-mob.png')}
            alt=""
          />
        ) : (
          <Image className="product-face" src={require('@img/product/banner-product.png')} alt="" />
        )}

        <div className="product-title text-46 md:text-64">
          <div className="text-up">Plugging into Multiple's</div>
          <div className="mt-9 text-up">Network Layer</div>
          <div className="text-24 mt-46 md:(mt-24) leading-[32rem]">
            <div className="px-120 md:px-0">
              Users: Supercharge your download speeds today! Free for the first 20GB.
            </div>
            <div>Providers: Turn your idle bandwidth into passive income.</div>
          </div>
        </div>

        <button className="download-btn text-27 md:text-14">Downloads coming soon</button>
      </section>

      <main className="mt-216 pb-1100 md:pb-411">
        {appStore.curDevice !== 'phone' && (
          <div className="text-up text-64 font-bold text-center mb-79">Advantages</div>
        )}

        <div className="px-38 md:px-0">
          <div className="flex-center flex-col md:flex-row">
            <AdvantagesItem
              reverseBg={false}
              title="Flexible deployment"
              face={require('@img/product/product-1.png')}
              className="w-full md:(w-638 mr-32)"
            >
              <div className="mt-16 text-23 md:text-16">
                Earn/pay as you go. No fixed-term commitments required.
              </div>
            </AdvantagesItem>

            <AdvantagesItem
              reverseBg
              title="Stability and Robustness"
              face={require('@img/product/product-2.png')}
              className="w-full mt-46 md:(w-450 mt-0)"
            >
              <div className="mt-16 text-23 md:text-16 leading-[1.5]">
                <div>With global peer node coverage,</div>
                <div>we overcome regular internet traffic congestion.</div>
              </div>
            </AdvantagesItem>
          </div>
          <div className="flex-center mt-46 md:mt-32 flex-col md:flex-row">
            <AdvantagesItem
              reverseBg={false}
              title="Cost efficiency"
              face={require('@img/product/product-3.png')}
              className="w-full md:(w-450 mr-32)"
            >
              <div className="mt-16 text-23 md:text-16 leading-[1.5]">
                <div>Priced at a fraction of traditional SD-WAN and</div>
                <div>dedicated connection costs.</div>
              </div>
            </AdvantagesItem>

            <AdvantagesItem
              reverseBg
              title="Privacy through Decentralization"
              face={require('@img/product/product-4.png')}
              className="w-full mt-46 md:(w-638 mt-0)"
            >
              <div className="mt-16 text-23 md:text-16 leading-[1.5]">
                <div>All data is completely encrypted, ensuring that no centralized</div>
                <div>storage provider is training on your proprietary data.</div>
              </div>
            </AdvantagesItem>
          </div>
        </div>
      </main>
    </ProductWrap>
  );
};

export default Product;
