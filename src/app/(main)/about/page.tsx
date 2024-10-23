'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import useAppStore from '@/store/appStore';
import Team from './components/Team';

const AboutWrap = styled.div`
  color: #fff;

  .banner-wrap {
    height: 600rem;

    .banner-face {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .about-main {
    padding: 260rem 207rem 146rem;
    ${flexPos('center', 'flex-start')}

    @media (max-width: 750px) {
      padding: 0 38rem 271rem;
    }

    .about-content {
      margin-right: 43rem;
      flex: 1 0 600rem;
    }

    .about-face {
      width: auto;
      max-width: 480rem;
      flex: 0 1 480rem;

      @media (max-width: 750px) {
        max-width: 396rem;
        flex: auto;
        margin: auto;
      }
    }

    .main-text {
      > div {
        color: #fff;
        &:not(:first-child) {
          margin-top: 30rem;
        }
      }
    }
  }
`;

const About = () => {
  const appStore = useAppStore();

  return (
    <AboutWrap>
      <div className="banner-wrap">
        {appStore.curDevice === 'phone' ? (
          <Image
            priority
            className="banner-face"
            src={require('@img/common/banner-about-mob.png')}
            alt=""
          />
        ) : (
          <Image
            priority
            className="banner-face"
            src={require('@img/common/banner-about.png')}
            alt=""
          />
        )}
      </div>
      <div className="absolute top-515 left-131 text-46 md:text-64 md:left-264 md:top-23vw text-#fff font-bold">
        ABOUT US
      </div>

      <main className="about-main flex-col-reverse mt-146 md:flex-row md:mt-0">
        <div className="about-content mt-115 md:mt-0">
          <div className="text-46 md:text-64 font-bold text-#fff mb-20 text-up">our story</div>

          <div className="main-text text-27 md:text-14">
            <div>
              Multiple Network is a privacy-protection and transmission acceleration network based
              on P2P and SD-WAN (Software-Defined Wide Area Network) technologies.
            </div>
            <div>
              By aggregating the bandwidth of distributed node users, it creates a programmable P2P
              network. Users can leverage this network’s API to enable anonymous communication and
              high-speed encrypted data transmission.
            </div>
            <div>
              Compared to traditional anonymous networks like TOR, Multiple offers higher bandwidth
              and lower latency. Its current use cases focus on input-side privacy protection in AI
              model calls, search engine interactions, and large-scale data encryption and
              acceleration. The first phase testnet of Multiple Network launched in August 2024.
            </div>
          </div>
        </div>
        <Image priority className="about-face" src={require('@img/common/logo-about.png')} alt="" />
      </main>

      {/* <Team /> */}
    </AboutWrap>
  );
};

export default About;
