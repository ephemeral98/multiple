import { styled } from 'styled-components';
import useAppStore from '@/store/appStore';
import Image from 'next/image';
import { FC, ReactNode } from 'react';

const BannerWrap = styled.div`
  position: relative;

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
  title?: string;
  children?: ReactNode;
}> = ({ pcBanner, mobBanner, title, children }) => {
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
      {!children ? (
        <div className="absolute top-515 left-131 text-46 md:text-64 md:left-264 md:top-23vw text-#fff font-bold">
          {title}
        </div>
      ) : (
        children
      )}
    </BannerWrap>
  );
};
