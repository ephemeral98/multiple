import { useEffect, useState } from 'react';
import {
  useTonConnectModal,
  useTonConnectUI,
  useTonAddress,
  ConnectedWallet,
} from '@tonconnect/ui-react';
import Button from '.';
import Image from 'next/image';
import { plusStar } from '@/utils';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

import TonWeb from 'tonweb';
import TestTon from './TestTon';

export const AddrWrap = styled.div`
  border-right: solid 1px #fff;
  padding-right: 8rem;
  margin-right: 8rem;
`;

const ConnectWallet = () => {
  const walletAddress = useTonAddress();
  const router = useRouter();
  const [tonConnectUI] = useTonConnectUI(); // 获取 TonConnect 实例
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null);
  const { open, close, state } = useTonConnectModal();

  useEffect(() => {
    // 状态变化处理函数
    const handleStatusChange = (wallet: ConnectedWallet | null) => {
      console.log('wallet...', wallet);
      if (wallet) {
        setWallet(wallet);
        setConnected(true);
      } else {
        setConnected(false);
      }
    };

    // 设置状态监听
    tonConnectUI.onStatusChange(handleStatusChange);
  }, [tonConnectUI]);

  // 使用新的 connect 方法连接钱包
  const connectWallet = async () => {
    await tonConnectUI.connectWallet();
  };

  // 自定义断开连接函数
  const disconnectWallet = () => {
    tonConnectUI.disconnect();
    setConnected(false);
  };

  return <TestTon />

  if (connected) {
    return (
      <Button staticLight onClick={() => {}} className={'ml-31 flex-center'}>
        <AddrWrap onClick={() => router.push('/account')}>{plusStar(walletAddress, 6, 6)}</AddrWrap>
        <Image
          className="w-16"
          priority
          src={require('@img/common/icon-logout.png')}
          alt=""
          onClick={() => disconnectWallet()}
        />
      </Button>
    );
  }

  return (
    <Button onClick={() => open()} className={'ml-31'}>
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
