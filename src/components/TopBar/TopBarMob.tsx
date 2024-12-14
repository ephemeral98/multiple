import { styled } from 'styled-components';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTopBar } from './useTopBar';
import { flexPos } from '@/styled/mixin';
import { useModal } from '@/hooks/useModal';
import Menu from './components/Menu';
import { useEffect, useState } from 'react';
import {
  useTonConnectModal,
  useTonConnectUI,
  useTonAddress,
  ConnectedWallet,
} from '@tonconnect/ui-react';

const TopBarMobWrap = styled.header`
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  backdrop-filter: blur(3px);

  height: 115rem;
  padding: 0 20rem;
  ${flexPos('space-between')}
`;

const TopBarMob = () => {
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI(); // 获取 TonConnect 实例
  const [connected, setConnected] = useState(false);
  const { open } = useTonConnectModal();
  const { toggle, isOpen, close } = useModal(Menu, {
    // root: '#root',
    animate: {
      enterActive: 'animate__animated animate__fadeInRight',
      exitActive: 'animate__animated animate__fadeOutRight',
    },
    props: {
      pickTab(tab) {
        if (tab.link) {
          window.open(tab.link);
          return;
        }
        router.push(tab.path);
      },
      toHome() {
        router.push('/');
      },
      onConnect() {
        open();
      },
      onClickAddr() {
        router.push('/account');
      },
      disconnectWallet() {
        tonConnectUI.disconnect();
        setConnected(false);
      },
      connected,
      walletAddress,
    },
  });

  const router = useRouter();

  useEffect(() => {
    // 状态变化处理函数
    const handleStatusChange = (wallet: ConnectedWallet | null) => {
      if (wallet) {
        setConnected(true);
      } else {
        setConnected(false);
      }
    };

    // 设置状态监听
    tonConnectUI.onStatusChange(handleStatusChange);
  }, [tonConnectUI]);
  return (
    <TopBarMobWrap>
      <Image
        priority
        className="w-262 cursor-pointer"
        src={require('@img/common/icon-logo.png')}
        alt=""
        onClick={() => {
          router.push('/');
          if (isOpen) {
            close();
          }
        }}
      />

      <Image
        priority
        className="w-54 cursor-pointer"
        src={require('@img/common/icon-menu.png')}
        alt=""
        onClick={() => toggle({ show: !isOpen })}
      />
    </TopBarMobWrap>
  );
};

export default TopBarMob;
