import { styled } from 'styled-components';
import Image from 'next/image';
import Marquee from '@/components/Marquee';
import useAppStore from '@/store/appStore';
import LaxScale from '@/components/Lax/LaxScale';
import VideoBox from '@/components/VideoBox';
import { useVideoPlay } from '../../hooks/useVideoPlay';
import { flexPos } from '@/styled/mixin';

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

    .banner-text {
      flex: auto;
      /* background-color: skyblue; */
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
      height: 64rem;
      background: linear-gradient(134deg, #303030 0%, #000000 100%);
      border-radius: 10rem;
      padding: 0 79rem;
      margin-top: 66rem;
      font-size: 20rem;
      border: 1px solid #585858;
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
    margin-top: 175rem;
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
  const { targetRef: targetRef1, videoRef: videoRef1 } = useVideoPlay();

  return (
    <BannerWrap>
      <LaxScale>
        <VideoBox className="one" src="/video/video-1.mp4" ref={videoRef1}>
          <div ref={targetRef1} className="abs-center z-10 w-300 h-100"></div>
        </VideoBox>
      </LaxScale>

      <main className="banner-content">
        <div className="banner-text">
          <div className="text-46 md:text-64 text-up">
            <div>Monetise your</div>
            <div> internet connection.</div>
            <div> Join and earn.</div>
          </div>
          <div className="content mt-33 text-23 md:text-20 leading-[1.4]">
            <div>Our AI-powered network layer revolutionises the way data is transmitted by</div>
            <div>allowing multiple simultaneous channels through your current bandwidth and</div>
            <div>intelligently selects the best private nodes for point to point navigation.</div>
          </div>
        </div>

        <button className="access-btn">Get access</button>
      </main>

      <Marquee
        className="z-9 absolute bottom-[53rem]"
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
