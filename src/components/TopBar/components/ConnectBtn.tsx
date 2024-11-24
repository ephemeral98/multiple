import { FC, useEffect, useState } from 'react';
import { useTonConnectModal, useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import Button from '@cps/Buttons/index';
import Image from 'next/image';
import { plusStar } from '@/utils';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

interface IConnectBtn {
  connected: boolean;
  walletAddress: string;
  disconnectWallet: () => void;
  onClickAddr: () => void;
  className?: string;
  onClick?: () => void;
}

export const AddrWrap = styled.div`
  border-right: solid 1px #fff;
  padding-right: 15rem;
  margin-right: 15rem;
`;

const ConnectWallet: FC<IConnectBtn> = (props) => {
  // const walletAddress = useTonAddress();
  // const router = useRouter();
  // const [tonConnectUI] = useTonConnectUI(); // 获取 TonConnect 实例
  const [wallet, setWallet] = useState(null);
  // const { open, close, state } = useTonConnectModal();

  if (props.connected) {
    return (
      <Button
        className={`mx-auto w-438 h-106 text-27! rounded-19! flex-center ${props.className}`}
        staticLight
        onClick={() => {}}
      >
        <AddrWrap onClick={() => props.onClickAddr()}>
          {plusStar(props.walletAddress, 6, 6)}
        </AddrWrap>
        <Image
          className="w-31"
          priority
          src={require('@img/common/icon-logout.png')}
          alt=""
          onClick={() => props.disconnectWallet()}
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => props.onClick?.()}
      className={`mx-auto w-438 h-106 text-27! rounded-19! ${props.className}`}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
