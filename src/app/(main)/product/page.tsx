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
import { Message } from '@arco-design/web-react';
import { $width } from '@/styled/mediaSize';

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

    .btns-wrap {
      position: absolute;
      transform: translate(-50%, 50%);
      left: 50%;
      bottom: 0;
    }

    .download-btn {
      border-radius: 10rem;
      border: solid 1px #fff;
      /* padding: 27rem 0; */
      ${$width('280rem', '319rem', '319rem')}
      height: 87rem;
      font-size: 20rem;

      white-space: nowrap;
      color: #fff;

      &:hover {
        background-image: linear-gradient(180deg, #567ecd 0%, #15236c 100%);
        border: none;
      }

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

        <div className="btns-wrap flex-center">
          <button
            onClick={() => {
              window.open('https://cdn.app.multiple.cc/client/MultipleSetup.exe');
            }}
            className="download-btn text-27 md:text-14 flex-center"
          >
            <Image
              priority
              className="w-24 mr-8"
              src={require('@img/product/icon-windows.png')}
              alt=""
            />

            <div>Download for Windows</div>
          </button>

          <button
            onClick={() => {
              window.open('https://cdn.app.multiple.cc/client/MultipleForLinux.tar');
            }}
            className="download-btn download-linux ml-25 text-27 md:text-14 flex-center"
          >
            <Image
              priority
              className="w-36 mr-8"
              src={require('@img/product/icon-linux.png')}
              alt=""
            />

            <div>Download for Linux</div>
          </button>
        </div>
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
