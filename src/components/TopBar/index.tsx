'use client';
import 'uno.css';
import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { useRouter } from 'next/navigation';
import { useTopBar } from './useTopBar';
import { GetStartBtn } from '../Community';
import Button from '../Buttons';
import { useLaunchToApp } from '@/hooks/useLaunchTo';
import useTonWallet from '@/hooks/useWallet/useTonWallet';
import { TonConnectButton } from '@tonconnect/ui-react';
import ConnectTonButton from '../Buttons/ConnectTonButton';
import { useTonConnectModal } from '@tonconnect/ui-react';

const TopBarWrap = styled.header`
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9;
  backdrop-filter: blur(3px);

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

  .nav-list {
    > .nav-item {
      position: relative;
      cursor: pointer;
      color: #fff;
      padding: 13rem 0;

      &:not(:first-child) {
        margin-left: 76rem;
      }

      &::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 0;
        height: 1px;
        transition: all 0.8s;
      }

      &.active {
        &::after {
          width: 26rem;
          background-color: #fff;
        }
      }
    }
  }
`;

const TopBar = () => {
  const router = useRouter();
  const { navList } = useTopBar();
  const { appLink, launchTo } = useLaunchToApp();
  const { connectWallet, walletAddress } = useTonWallet();

  const { open, close, state } = useTonConnectModal();

  return (
    <TopBarWrap>
      <div className="topbar-content w-full px-20 md:px-50 topbar:(w-1400 px-0)">
        <div className="flex-center">
          <Image
            priority
            className="logo cursor-pointer"
            src={require('@img/common/icon-logo.png')}
            alt=""
            onClick={() => router.push('/')}
          />

          <div className="nav-list flex-center">
            {navList.map((item) => (
              <div
                key={item.text}
                onClick={() => {
                  if (item.link) {
                    window.open(item.link);
                    return;
                  }
                  router.push(item.path);
                }}
                className={`nav-item ${item.active ? 'active' : ''}`}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-center">
          <Button onClick={() => router.push('/product')}>Download</Button>
          <Button
            onClick={() => {
              open();
            }}
            className={'ml-31'}
          >
            Get Started::{walletAddress}
          </Button>

          <TonConnectButton className="connect-ton-btn" />
          <ConnectTonButton />
        </div>
      </div>
    </TopBarWrap>
  );
};

export default TopBar;
