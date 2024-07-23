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
    padding: 260rem 207rem 265rem;
    ${flexPos('center', 'flex-start')}

    @media (max-width: 750px) {
      padding: 0 38rem 271rem;
    }

    .about-content {
      margin-right: 43rem;
      flex: 1 0 702rem;
    }

    .about-face {
      width: auto;
      max-width: 594rem;
      flex: 0 1 594rem;

      @media (max-width: 750px) {
        max-width: 396rem;
        flex: auto;
        margin: auto;
      }
    }

    .main-text {
      > li {
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
            <li>
              We are a team of ecosystem builders and network architects leveraging SD-WAN
              technology to build a network layer to enable high-powered transmission of digital
              assts and data possible.
            </li>
            <li>
              By creating multiple parallel channels to optimise bandwidth, our solution beautifully
              meets the constant need to feed sophisticated AI models with proprietary data,
              ensuring that it is sent with speed, privacy and cost-efficiency through our
              decentralised flotilla of bandwidth providers.
            </li>
            <li>
              Critically, it also enables remote teams and individuals to work and share across
              borders without hiccups in connectivity.
            </li>
          </div>
        </div>
        <Image priority className="about-face" src={require('@img/common/logo-about.png')} alt="" />
      </main>

      <Team />
    </AboutWrap>
  );
};

export default About;
