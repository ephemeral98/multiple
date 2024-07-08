'use client';
import { styled } from 'styled-components';
import VideoBox from '@cps/VideoBox';
import { useVideoPlay } from './hooks/useVideoPlay';
import Image from 'next/image';
import useAppStore from '@/store/appStore';
import Banner from './product/components/Banner';

const HomeWrap = styled.div`
  background-color: #00000087;

  .bg-mask {
    background-color: #00000087;
    border-radius: 10rem;
    padding: 32rem;
    @media (max-width: 750px) {
      padding: 48rem;
    }
  }

  .home-section {
    position: absolute;
    z-index: 10;

    .section-title {
      font-weight: 400;
    }
    .section-content {
      font-size: 20rem;
      font-weight: 300;
    }
    div {
      color: #fff;
    }
  }
`;

const Home: React.FC = () => {
  const appStore = useAppStore();

  const { targetRef: targetRef1, videoRef: videoRef1 } = useVideoPlay();
  const { targetRef: targetRef2, videoRef: videoRef2 } = useVideoPlay();
  const { targetRef: targetRef3, videoRef: videoRef3 } = useVideoPlay();
  const { targetRef: targetRef4, videoRef: videoRef4 } = useVideoPlay();

  return (
    <HomeWrap>
      <Banner />
      <VideoBox className="one" src="/video/video-1.mp4" ref={videoRef1}>
        <div ref={targetRef1} className="abs-center z-10 w-300 h-100"></div>
        <section className="home-section bottom-[10%] left-60 md:left-[13%]">
          <div className="section-title text-46 md:text-64">SUMMONING AN ENTIRE FLOTILLA</div>
          <div className="section-title text-46 md:text-64">FOR YOUR NEEDS</div>
          <div className="section-content mt-41 text-27! md:text-24!">
            Building a network layer to fuel data transmission.
          </div>
        </section>
      </VideoBox>
      <VideoBox src="/video/video-2.mp4" ref={videoRef2}>
        <div ref={targetRef2} className="abs-center z-10 w-300 h-100"></div>
        <section className="home-section bottom-131 right-40 md:bottom-auto md:top-[13%] md:right-[8%] text-right bg-mask">
          <div className="section-title text-46 md:text-64">AI DATA</div>
          <div className="section-title text-46 md:text-64">TRANSMISSION</div>
          {appStore.curDevice === 'phone' ? (
            <div className="section-content text-27! md:text-24! mt-16">
              <div>Secure | Resolving AI learning</div>
              <div className="mt-9">bottlenecks by ensuring</div>
              <div className="mt-9">that high-quality data is</div>
              <div className="mt-9">constantly fed from a</div>
              <div className="mt-9">dynamic variety of</div>
              <div className="mt-9">sources 24/7.</div>
            </div>
          ) : (
            <div className="section-content text-27! md:text-24! mt-16">
              <div>Secure | Resolving AI learning bottlenecks by ensuring</div>
              <div className="mt-9">that high-quality data is constantly fed from a</div>
              <div className="mt-9">dynamic variety of sources 24/7.</div>
            </div>
          )}
        </section>
      </VideoBox>
      <VideoBox src="/video/video-3.mp4" ref={videoRef3}>
        <div ref={targetRef3} className="abs-center z-10 w-300 h-100"></div>
        <section className="home-section top-548 left-35 md:top-[37%] md:left-[13%] bg-mask">
          {appStore.curDevice === 'phone' ? (
            <>
              <div className="section-title text-46 md:text-64">BESPOKE</div>
              <div className="section-title text-46 md:text-64 mt-9">SD WAN</div>
              <div className="section-content text-27! md:text-24! mt-16 text-left">
                <div className="mt-31">Privacy | Building private</div>
                <div className="mt-9">offices for global teams by </div>
                <div className="mt-9">creating fit-for-purpose and</div>
                <div className="mt-9">optimised WANs.</div>
              </div>
            </>
          ) : (
            <>
              <div className="section-title text-46 md:text-64">BESPOKE SD WAN</div>
              <div className="section-content text-27! md:text-24! mt-16 text-center">
                <div>Privacy | Building private offices for global teams by creating</div>
                <div className="mt-9">fit-for-purpose and optimised WANs.</div>
              </div>
            </>
          )}
        </section>
      </VideoBox>
      <VideoBox src="/video/video-4.mp4" ref={videoRef4}>
        <div ref={targetRef4} className="abs-center z-10 w-300 h-100"></div>
        <section className="home-section bottom-[3%] right-[12%] bg-mask">
          <div className="section-title text-46 md:text-64 text-right">LARGE SIZED</div>
          <div className="section-title text-46 md:text-64 text-right">FILE TRANSFER</div>

          {appStore.curDevice === 'phone' ? (
            <div className="section-content text-27! md:text-24! mt-16 text-right">
              <div className="mt-9">Speed | Transforming traditional</div>
              <div className="mt-9">single channel transmission</div>
              <div className="mt-9">into multiple parallel pathways</div>
              <div className="mt-9">to maximize your entire</div>
              <div className="mt-9">physical bandwidth when</div>
              <div className="mt-9">navigating from A to B.</div>
            </div>
          ) : (
            <div className="section-content text-27! md:text-24! mt-16 text-right">
              <div>Speed | Transforming traditional single channel transmission into</div>
              <div className="mt-9">multiple parallel pathways to maximize your entire</div>
              <div className="mt-9">physical bandwidth when navigating from A to B.</div>
            </div>
          )}
        </section>
      </VideoBox>

      <section className="flex justify-center relative pt-296 pb-160">
        <Image
          priority
          className="w-319 h-219 md:w-356 md:h-244"
          src={require('@img/common/home-logo.png')}
          alt=""
        />
      </section>
    </HomeWrap>
  );
};

export default Home;
