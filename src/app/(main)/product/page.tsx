'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import AdvantagesItem from './components/AdvantagesItem';
import useAppStore from '@/store/appStore';
import RoadMap from './components/RoadMap/RoadMapPc';
import RoadMapMob from './components/RoadMap/RoadMapMob';
import { ProductHeader } from './components/Header';
import Step from './components/StepComp';
import StepMob from './components/StepComp/StepMob';
import { useState } from 'react';

const ProductWrap = styled.div<{ $end: boolean }>`
  line-height: 1;

  .arco-affix {
    position: ${(props) => (props.$end ? 'static' : 'fixed')} !important;
  }

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
  const [roadMapEnd, setRoadMapEnd] = useState(false);

  return (
    <ProductWrap $end={roadMapEnd}>
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
        <ProductHeader>How to use Multiple</ProductHeader>

        {appStore.curDevice === 'phone' ? <StepMob /> : <Step />}
      </main>

      {appStore.curDevice === 'phone' ? (
        <RoadMapMob
          onEnd={() => {
            console.log('end...');
            setRoadMapEnd(true);
          }}
        />
      ) : (
        <RoadMap />
      )}
    </ProductWrap>
  );
};

export default Product;
