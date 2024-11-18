import { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Button from '.';
import { plusStar } from '@/utils';

const ConnectWallet = () => {
  const [tonConnectUI] = useTonConnectUI(); // 获取 TonConnect 实例
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    // 状态变化处理函数
    const handleStatusChange = (wallet) => {
      if (wallet) {
        setConnected(true);
        setWalletAddress(wallet.account.address);
      } else {
        setConnected(false);
        setWalletAddress('');
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
    setWalletAddress('');
  };

  if (connected) {
    return (
      <Button
        onClick={() => {
          console.log('钱包...');
        }}
        className={'ml-31'}
      >
        {plusStar(walletAddress, 6, 6)}
      </Button>
    );
  }

  return (
    <Button onClick={() => open()} className={'ml-31'}>
      Connect Wallet
    </Button>
  );

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected to: {walletAddress}</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default ConnectWallet;
