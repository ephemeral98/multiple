'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const AboutWrap = styled.div`
  color: #fff;

  .about-main {
    padding: 260rem 207rem 457rem;
    ${flexPos('center', 'flex-start')}

    .about-content {
      margin-right: 43rem;
      flex: 1 0 702rem;
    }

    .about-face {
      width: auto;
      max-width: 594rem;
      flex: 0 1 594rem;
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
  return (
    <AboutWrap>
      <Image className="w-full" src={require('@img/common/banner-about.png')} alt="" />
      <div className='absolute top-23vw left-264 text-64 text-#fff font-bold'>ABOUT US</div>

      <main className="about-main">
        <div className="about-content">
          <div className="text-64 text-#fff mb-20 text-up">our story</div>

          <div className="main-text">
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
        <Image className="about-face" src={require('@img/common/logo-about.png')} alt="" />
      </main>
    </AboutWrap>
  );
};

export default About;
