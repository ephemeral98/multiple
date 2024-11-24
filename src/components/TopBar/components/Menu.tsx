import { styled } from 'styled-components';
import Image from 'next/image';
import { INav, useTopBar } from '../useTopBar';
import { flexPos } from '@/styled/mixin';
import Community, { GetStartBtn } from '@/components/Community';
// import ConnectTonButton from '@/components/Buttons/ConnectTonButton';
import { Suspense, useEffect, useState } from 'react';
import ConnectWallet from './ConnectBtn';

interface IProps {
  onClose: () => void;
  pickTab: (tab: INav) => void;
  toHome: () => void;
  onConnect: () => void;
  onClickAddr: () => void;
  disconnectWallet: () => void;
  walletAddress: string;
  connected: boolean;
}

const MenuWrap = styled.div`
  position: fixed;
  left: 0;
  /* top: 115rem; */
  top: 0;
  width: 100%;
  /* height: calc(100vh - 115rem); */
  height: 100vh;
  background-color: #000;
  padding-top: 237rem;

  ${flexPos('center', 'flex-start')}
  text-align: center;

  .nav-item {
    font-size: 38rem;
    &:not(:first-child) {
      margin-top: 62rem;
    }
  }

  .icon-close {
    width: 42rem;
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: 175rem;
  }
`;

const Menu = (props: IProps) => {
  const { navList } = useTopBar();

  return (
    <MenuWrap>
      <div>
        {/* <div
          onClick={() => {
            props.toHome();
            props.onClose();
          }}
          className={`nav-item`}
        >
          Home
        </div> */}
        {navList.map((item) => (
          <div
            key={item.text}
            onClick={() => {
              props.pickTab(item);
              props.onClose();
            }}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            {item.text}
          </div>
        ))}

        <GetStartBtn />
        <ConnectWallet
          className="mt-48"
          connected={props.connected}
          disconnectWallet={() => props.disconnectWallet()}
          walletAddress={props.walletAddress}
          onClickAddr={() => {
            props.onClickAddr();
            props.onClose();
          }}
          onClick={() => {
            props.onClose();
            props.onConnect();
          }}
        />

        <Community className="mt-62" size={75} gap={24} />
      </div>

      <Image
        priority
        onClick={() => {
          props.onClose();
        }}
        className="icon-close"
        src={require('@img/common/icon-close.svg')}
        alt=""
      />
    </MenuWrap>
  );
};

export default Menu;
