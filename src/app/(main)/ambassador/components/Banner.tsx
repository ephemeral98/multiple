'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { $fontSize, $height } from '@/styled/mediaSize';

const BannerWrap = styled.div`
  position: relative;

  .face-wrap {
    width: 100%;
    ${$height('600rem', 'auto', 'auto')}

    .face-content {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;

const BannerSlogan = styled.div`
  text-align: center;
  ${$fontSize('48rem', '48rem', '64rem')}
  position: absolute;
  left: 50%;
  bottom: 20%;
  line-height: 1;
  transform: translateX(-50%);
  z-index: 1;
`;

const ApplyNowBtn = styled.button`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 370rem;
  height: 70rem;
  ${$fontSize('24rem', '24rem', '16rem')}
  border-radius: 10rem;
  background-color: #fff;
  color: #000;
`;

const Banner = () => {
  return (
    <BannerWrap>
      <div className="face-wrap">
        <Image
          priority
          className="face-content"
          src={require('@img/common/banner-ambassador.png')}
          alt=""
        />
      </div>

      <BannerSlogan>
        <div>MTP Global</div>
        <div>Ambassador Program</div>
      </BannerSlogan>

      <ApplyNowBtn
        onClick={() => {
          window.open('https://forms.gle/eYR9K1UjuugJ3Jtb9');
        }}
      >
        Apply Now
      </ApplyNowBtn>
    </BannerWrap>
  );
};

export default Banner;
