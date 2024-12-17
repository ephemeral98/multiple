import { styled } from 'styled-components';
import Image from 'next/image';
import Marquee from '@/components/Marquee';
import useAppStore from '@/store/appStore';
import LaxScale from '@/components/Lax/LaxScale';
import VideoBox from '@/components/VideoBox';
import { useVideoPlay } from '../../hooks/useVideoPlay';
import { flexPos } from '@/styled/mixin';
import { $borderRadius, $fontSize, $height, $width, phoneSize } from '@/styled/mediaSize';
import { useEffect } from 'react';
import { Message } from '@arco-design/web-react';

const BannerWrap = styled.div`
  width: 100%;
  height: 100vh;
  /* padding: 156rem 0 56rem; */
  margin: 0 auto;
  flex-direction: column;
  position: relative;
  /* background-color: pink; */
  ${flexPos('center')}

  @media (max-width: 750px) {
    width: 100%;
    justify-content: space-between;
  }

  > .banner-content {
    ${flexPos('center')}
    flex-direction: column;
    line-height: 1;
    position: relative;
    z-index: 9;
    text-align: center;

    @media (max-width: ${phoneSize}) {
      margin: auto;
    }

    .banner-text {
      flex: auto;
      @media (min-width: 750px) {
        white-space: nowrap;
      }

      .content > div {
        @media (max-width: 750px) {
          display: inline;
        }
      }
    }

    .access-btn {
      background-color: #2865ff;
      padding: 0 79rem;
      margin-top: 66rem;
      ${$fontSize('27rem', '20rem', '20rem')}
      ${$height('106rem', '64rem', '64rem')}
      ${$borderRadius('19rem', '10rem', '10rem')}
      ${$width('483rem', 'auto', 'auto')}
    }

    .banner-face {
      flex: 0 0 567rem;
      padding-top: 162rem;

      @media (max-width: 750px) {
        flex: 0 0 537rem;
        width: 537rem;
      }
    }
  }

  .icon-partner {
    display: grid;
    grid-template-columns: repeat(8, auto);
    place-content: center;
    place-items: center;
    grid-gap: 85rem;
    margin-top: 145rem;
    /* position: absolute; */
    /* bottom: 0; */
    z-index: 999;
    /* background-color: #fff; */

    width: 100%;
    overflow-x: auto;

    @media (max-width: 750px) {
      justify-content: flex-start;
      display: flex;
      flex-wrap: nowrap;
      padding: 0 37rem;
      /* margin-top: 0; */

      img {
        width: 137rem;
      }
    }
  }
`;

const Banner = () => {
  const appStore = useAppStore();
  // const { targetRef: targetRef1, videoRef: videoRef1 } = useVideoPlay();

  return (
    <BannerWrap>
      <LaxScale>
        {/* <VideoBox className="one" src="/video/video-1.mp4" ref={videoRef1}></VideoBox> */}
        <div className="w-full h-screen">
          <Image
            src={require('@img/home/banner.png')}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </LaxScale>

      <main className="banner-content">
        <div className="banner-text">
          <div className="text-46 md:text-64">
            <div>Web3 Privacy Acceleration </div>
            <div>
              Solution for <span className="text-#2865FF">AI</span>
            </div>
          </div>
          {/* <div className="content px-30 md:px-0 mt-33 text-23 md:text-20 leading-[1.4]">
            <div>Multiple Network is a privacy-focused, transmission acceleration network</div>
            <div>leveraging P2P and SD-WAN technologies, enabling anonymous</div>
            <div>communication and encrypted high-speed data transfer.</div>
          </div> */}
        </div>

        <button className="access-btn" onClick={() => window.open('https://www.app.multiple.cc')}>
          Get Started
        </button>
      </main>

      <Marquee
        className="z-9 absolute bottom-[280rem] md:bottom-[53rem]"
        duration={0.01}
        infinity={appStore.curDevice === 'phone'}
      >
        <div className="icon-partner">
          <Image src={require('@img/common/icon-okx.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-ngc.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-stratifiec.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-puzzle.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-bitrise.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-catchervc.png')} alt="" className="w-full" />
          <Image src={require('@img/common/icon-youbicapital.png')} alt="" className="w-full" />
        </div>
      </Marquee>
    </BannerWrap>
  );
};

export default Banner;
