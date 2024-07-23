'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import AdvantagesItem from './components/AdvantagesItem';
import useAppStore from '@/store/appStore';
import RoadMap from './components/RoadMap/RoadMapPc';
import RoadMapMob from './components/RoadMap/RoadMapMob';
import { StepItem, StepItemMini } from './components/StepItem';

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
      color: #fff;

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
            priority
            className="product-face"
            src={require('@img/product/banner-product-mob.png')}
            alt=""
          />
        ) : (
          <Image
            priority
            className="product-face"
            src={require('@img/product/banner-product.png')}
            alt=""
          />
        )}

        <div className="product-title text-46 md:text-64">
          <div className="text-up">Plugging into Multiple's</div>
          <div className="mt-9 text-up">Network Layer</div>
          <div className="text-24 mt-46 md:mt-24 leading-[32rem]">
            <div className="px-120 md:px-0">
              Users: Supercharge your download speeds today! Free for the first 20GB.
            </div>
            <div>Providers: Turn your idle bandwidth into passive income.</div>
          </div>
        </div>

        <button className="download-btn text-27 md:text-14">Downloads coming soon</button>
      </section>

      <main className="mt-216 pb-192 md:pb-224">
        {appStore.curDevice !== 'phone' && (
          <div className="text-up text-64 font-bold text-center mb-79">How to use Multiple</div>
        )}

        <section className="flex-center">
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

          <Image priority className="mx-14" src={require('@img/home/icon-arrow.svg')} alt="" />

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
        </section>
      </main>

      {appStore.curDevice === 'phone' ? <RoadMapMob /> : <RoadMap />}
    </ProductWrap>
  );
};

export default Product;
