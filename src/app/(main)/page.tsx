'use client';
import { styled } from 'styled-components';
import VideoBox from '@cps/VideoBox';
import { useVideoPlay } from './hooks/useVideoPlay';
import Image from 'next/image';

const HomeWrap = styled.div`
  background-color: #00000087;

  .bg-mask {
    background-color: #00000087;
    border-radius: 10rem;
    padding: 32rem;
  }

  .home-section {
    position: absolute;
    z-index: 10;

    .section-title {
      font-weight: 400;
      font-size: 64rem;
    }
    .section-content {
      font-size: 20rem;
      font-weight: 300;
    }
    div {
      color: #fff;
    }
  }

  .start-btn {
    padding: 16rem 24rem;
    border-radius: 4rem;
    border: solid 1px #fff;
    color: #fff;
  }

  .border-top-white {
    border-top: solid 1px #fff;
  }

  .home-footer {
    div {
      color: #fff;
    }
  }
`;

const Home: React.FC = () => {
  const { targetRef: targetRef1, videoRef: videoRef1 } = useVideoPlay();
  const { targetRef: targetRef2, videoRef: videoRef2 } = useVideoPlay();
  const { targetRef: targetRef3, videoRef: videoRef3 } = useVideoPlay();
  const { targetRef: targetRef4, videoRef: videoRef4 } = useVideoPlay();

  return (
    <HomeWrap>
      <VideoBox className="one" src="/video/video-1.mp4" ref={videoRef1}>
        <div ref={targetRef1} className="abs-center z-10 w-300 h-100 bg-pink"></div>
        <section className="home-section bottom-[10%] left-[13%]">
          <div className="section-title">SUMMONING AN ENTIRE FLOTILLA</div>
          <div className="section-title">FOR YOUR NEEDS</div>
          <div className="section-content mt-41 text-24!">
            Building a network layer to fuel data transmission.
          </div>
        </section>
      </VideoBox>
      <VideoBox src="/video/video-2.mp4" ref={videoRef2}>
        <div ref={targetRef2} className="abs-center z-10 w-300 h-100 bg-pink"></div>
        <section className="home-section top-[13%] right-[8%] text-right bg-mask">
          <div className="section-title">AI DATA</div>
          <div className="section-title">TRANSMISSION</div>
          <div className="section-content mt-16">
            <div>Secure | Resolving AI learning bottlenecks by ensuring</div>
            <div className="mt-9">that high-quality data is constantly fed from a</div>
            <div className="mt-9">dynamic variety of sources 24/7.</div>
          </div>
        </section>
      </VideoBox>
      <VideoBox src="/video/video-3.mp4" ref={videoRef3}>
        <div ref={targetRef3} className="abs-center z-10 w-300 h-100 bg-pink"></div>
        <section className="home-section top-[37%] left-[13%] bg-mask">
          <div className="section-title">BESPOKE SD WAN</div>
          <div className="section-content mt-16 text-center">
            <div>Privacy | Building private offices for global teams by creating</div>
            <div className="mt-9">fit-for-purpose and optimised WANs.</div>
          </div>
        </section>
      </VideoBox>
      <VideoBox src="/video/video-4.mp4" ref={videoRef4}>
        <div ref={targetRef4} className="abs-center z-10 w-300 h-100 bg-pink"></div>
        <section className="home-section bottom-[3%] right-[12%] bg-mask">
          <div className="section-title text-right">LARGE SIZED</div>
          <div className="section-title text-right">FILE TRANSFER</div>
          <div className="section-content mt-16 text-right">
            <div>Speed | Transforming traditional single channel transmission into</div>
            <div className="mt-9">multiple parallel pathways to maximize your entire</div>
            <div className="mt-9">physical bandwidth when navigating from A to B.</div>
          </div>
        </section>
      </VideoBox>

      <footer className="home-footer h-100vh flex-center relative">
        <Image className="w-356 h-244" src={require('@img/common/home-logo.png')} alt="" />

        <section className="absolute bottom-0 z-11 w-full">
          <div className="flex items-center justify-between px-260">
            <div className="flex-center">
              <div className="cursor-pointer">Product</div>
              <div className="ml-59 cursor-pointer">About Us</div>
              <button className="start-btn ml-59">GetStarted</button>
            </div>

            <div className="flex-center">
              <Image className="w-51 h-51 cursor-pointer" src={require('@img/common/icon-discord.png')} alt="" />
              <Image className="w-51 h-51 ml-24 cursor-pointer" src={require('@img/common/icon-x.png')} alt="" />
            </div>
          </div>

          <div className="flex items-center justify-between border-top-white mt-38 py-24 px-260">
            <div>Copyright © 2024. By Multiple All rights reserved.</div>
            <div className="flex-center">
              <div className="cursor-pointer">Privacy Policy</div>
              <div className="ml-43 cursor-pointer">Terms and Conditions</div>
            </div>
          </div>
        </section>
      </footer>
    </HomeWrap>
  );
};

export default Home;
