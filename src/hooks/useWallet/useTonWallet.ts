import { useState, useEffect } from 'react';
import { TonConnect } from '@tonconnect/sdk';

const useTonWallet = () => {
  const [tonConnect, setTonConnect] = useState<any>(null);
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  useEffect(() => {
    // 初始化 TonConnect
    const tonConnectInstance = new TonConnect({
      manifestUrl: 'https://multiple.cc/static-files/manifest.json',
    });
    setTonConnect(tonConnectInstance);

    // 检查是否已有连接
    tonConnectInstance.restoreConnection().then((connectedAccount: any) => {
      // console.log('connectedAccount....', connectedAccount);

      if (connectedAccount) {
        setConnected(true);
        setWalletAddress(connectedAccount.account.address);
      }
    });

    // // 监听状态变化
    tonConnectInstance.onStatusChange((status: any) => {
      if (status.connected) {
        setConnected(true);
        setWalletAddress(status.account.address);
      } else {
        setConnected(false);
        setWalletAddress(null);
      }
    });
  }, []);

  // 连接钱包
  const connectWallet = async () => {
    if (tonConnect) {
      await tonConnect.connect();
    }
  };

  // 断开钱包连接
  const disconnectWallet = async () => {
    if (tonConnect) {
      await tonConnect.disconnect();
      setConnected(false);
      setWalletAddress(null);
    }
  };

  return {
    connected,
    walletAddress,
    connectWallet,
    disconnectWallet,
  };
};

export default useTonWallet;
