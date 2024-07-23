import { styled } from 'styled-components';
import useAppStore from '@/store/appStore';
import Image from 'next/image';
import { FC } from 'react';

const BannerWrap = styled.div`
  .banner-wrap {
    height: 600rem;

    .banner-face {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
`;

export const Banner: FC<{
  pcBanner: string;
  mobBanner: string;
  title: string;
}> = ({ pcBanner, mobBanner, title }) => {
  const appStore = useAppStore();

  return (
    <BannerWrap>
      <div className="banner-wrap">
        {appStore.curDevice === 'phone' ? (
          <Image priority className="banner-face" src={mobBanner} alt="" />
        ) : (
          <Image priority className="banner-face" src={pcBanner} alt="" />
        )}
      </div>
      <div className="absolute top-515 left-131 text-46 md:text-64 md:left-264 md:top-23vw text-#fff font-bold">
        {title}
      </div>
    </BannerWrap>
  );
};
