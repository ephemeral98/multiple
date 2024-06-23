'use client';
import 'uno.css';
import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const TopBarWrap = styled.header`
  .topbar-content {
    height: 100rem;
    margin: 0 auto;
    ${flexPos('space-between')}

    .logo {
      width: 263rem;
      height: 29rem;
      margin-right: 128rem;
    }

    .start-btn {
      padding: 16rem 24rem;
      border-radius: 4rem;
      border: solid 1px #fff;
      color: #fff;
    }
  }
`;

const TopBar = () => {
  return (
    <TopBarWrap>
      <div className="topbar-content w-full px-20 md:px-50 topbar:(w-1400 px-0)">
        <div className="flex-center">
          <Image
            className="logo cursor-pointer"
            src={require('@img/common/icon-logo.png')}
            alt=""
          />
          <div className="cursor-pointer text-#fff">About Us</div>
          <div className="ml-76 cursor-pointer text-#fff">Product</div>
        </div>

        <button className="start-btn">GetStarted</button>
      </div>
    </TopBarWrap>
  );
};

export default TopBar;
