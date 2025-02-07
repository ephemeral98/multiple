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
import { $width, phoneSize } from '@/styled/mediaSize';

const ProductWrap = styled.div<{ $end: boolean }>`
  line-height: 1;

  li {
    list-style-image: none;
    list-style-position: outside;
    list-style-type: none;
  }

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

      @media (max-width: ${phoneSize}) {
        flex-direction: column;
      }
    }

    .download-btn {
      border-radius: 10rem;
      border: solid 1px #fff;
      /* padding: 27rem 0; */
      ${$width('319rem', '319rem', '319rem')}
      height: 87rem;
      font-size: 20rem;
      position: relative;

      white-space: nowrap;
      color: #fff;

      &.border-none {
        border: none;
      }

      .download-linux {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 10rem;
      }

      @media (max-width: 750px) {
        padding: 37rem 52rem;
        border-radius: 19rem;
      }

      .download-panel {
        width: 100%;
        /* height: 102rem; */
        max-height: 0;
        position: absolute;
        left: 0;
        top: 84rem;
        display: flex;
        flex-direction: column;
        padding: 0 24rem;
        font-size: 16rem;
        transition: all 0.3s ease-in-out;
        border: solid 1px transparent;
        border-top: none;
        border-radius: 0 0 16rem 16rem;

        .panel-item {
          flex: 1;
          ${flexPos('space-between')}
          cursor: pointer;
          overflow: hidden;
        }
      }

      &:hover {
        background: linear-gradient(180deg, #567ecd 0%, #15236c 100%);
        border: none;

        .download-panel {
          max-height: 300rem;
          padding: 22rem 24rem;
          border: solid 1px #fff;
          border-top: none;
        }
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
              window.open(
                'https://mdeck-download.s3.us-east-1.amazonaws.com/client/win/MultipleSetup.exe '
              );
            }}
            className="download-btn text-27 md:text-14 flex-center order-1"
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
              window.open(
                'https://mdeck-download.s3.us-east-1.amazonaws.com/client/linux/MultipleForLinux.tar '
              );
            }}
            className="download-btn ml-25 text-27 md:text-14 flex-center order-1"
          >
            <Image
              priority
              className="w-36 mr-8"
              src={require('@img/product/icon-linux.png')}
              alt=""
            />

            <div>Download for Linux</div>
          </button>
          <button
            onClick={() => {
              window.open(
                'https://chromewebstore.google.com/detail/multiple-lite-node/ciljbjmmdhnhgbihlcohoadafmhikgib'
              );
            }}
            className="download-btn text-27 md:text-14 flex-center mt-25 md:mt-0 md:ml-25 order-2 md:order-3"
          >
            <Image
              priority
              className="w-24 mr-8"
              src={require('@img/product/icon-chrome-ext.png')}
              alt=""
            />

            <div>Install Chrome Extension</div>
          </button>
        </div>
      </section>

      <main className="mt-260 md:mt-216 pb-192 md:pb-224">
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
