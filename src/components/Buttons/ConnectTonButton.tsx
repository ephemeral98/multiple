import { useEffect, useState } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import Button from '.';
import { plusStar } from '@/utils';
import TonWeb from 'tonweb';

const ConnectWallet = () => {
  const [tonConnectUI] = useTonConnectUI(); // 获取 TonConnect 实例
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    // 状态变化处理函数
    const handleStatusChange = (wallet) => {
      console.log('wallet...', wallet);
      if (wallet) {
        setWallet(wallet);
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

  // const tonweb = new TonWeb();
  const provider = new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {
    // apiKey: 'YOUR_TONCENTER_API_KEY', // 替换为你的 API 密钥
    apiKey: 'd75f0995d491f9ac7df1694300f628d91654c790ec69547fe57bd08d2327e665',
  });

  const COLLECTION_ADDRESS = 'EQD4Vnk_OhtrHPpCS53jXoxH6Hmfcz3Itm3iF8mrliiCYIPh'; // 你的 NFT 集合合约地址
  const ITEM_ADDRESS = 'EQDlLCvpnXPszlqlf-HPD0G14nHt6X0SCq_uDPU_GElaO6hb'; // 你的 NFT 项目合约地址

  const { NftCollection, NftItem } = TonWeb.token.nft;

  // 创建 NftCollection 实例
  const nftCollection = new NftCollection(provider, {
    ownerAddress: new TonWeb.utils.Address('EQB58QagLwZHLi-wI-9w1l_Z6OMslZJBB_GcgLezH70Rq62x'), // NFT 集合的拥有者地址
    royalty: 0.05, // 确保版权费是有效的（例如 0.05）
    royaltyAddress: new TonWeb.utils.Address('EQB58QagLwZHLi-wI-9w1l_Z6OMslZJBB_GcgLezH70Rq62x'), // NFT 集合的拥有者地址
    collectionContentUri: 'ipfs://collectionUri', // 确保 collectionUri 是有效的
    nftItemContentBaseUri: '', // 可为空，视具体情况
    nftItemCodeHex: NftItem.codeHex, // 需要提供正确的 NFT 代码
  });

  // 获取 NFT 集合的元数据
  const getCollectionData = async () => {
    // console.log('nftCollection...', nftCollection);
    // return;
    const collectionData = await nftCollection.getCollectionData();
    console.log('Collection Data:', collectionData);
  };

  // 获取指定索引的 NFT 项目数据
  const getNftDataByIndex = async (index) => {
    const nftItem = new NftItem(provider, {
      collectionAddress: new TonWeb.utils.Address(
        'EQB58QagLwZHLi-wI-9w1l_Z6OMslZJBB_GcgLezH70Rq62x'
      ), // NFT 集合地址
      itemIndex: index, // 要查询的 NFT 项目的索引
    });

    const nftData = await nftItem.getData();
    console.log('NFT Data:', nftData);
  };

  const mintNft = async (walletAddress) => {
    const nftCollection = new NftCollection(provider, {
      ownerAddress: walletAddress, // NFT 集合拥有者的地址
      royalty: 0, // 设定 NFT 版权费
      royaltyAddress: walletAddress, // 版权费接收地址
    });

    const mintBody = await nftCollection.createMintBody({
      amount: TonWeb.utils.toNano('0'), // 需要支付的 TON
      itemIndex: 0, // NFT 项目的索引
      itemContentUri: 'ipfs://NFT_METADATA_URI', // NFT 的元数据 URI
      itemOwnerAddress: walletAddress, // NFT 的拥有者地址
    });

    const bodyBoc = await mintBody.toBoc(false);
    const bodyBase64 = TonWeb.utils.bytesToBase64(bodyBoc);

    const _provider = window.ton; // 使用浏览器的 TonWallet 提供者
    _provider
      .send('ton_sendTransaction', [
        {
          to: nftCollection?.address?.toString(true, true, true),
          value: TonWeb.utils.toNano('0').toString(),
          data: bodyBase64,
          dataType: 'boc',
        },
      ])
      .then((res) => {
        if (res) {
          console.log('Mint successful');
        } else {
          console.log('Transaction failed');
        }
      })
      .catch((err) => {
        console.error('Minting error:', err);
      });
  };

  const fetchNFTData = async (nftAddress) => {
    return;

    // const tonweb = new TonWeb(provider);
    // const tonweb2 = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

    // // 创建合约实例
    // const collectionContract = tonweb2.Contract('nft_collection', Address.parse(COLLECTION_ADDRESS));
    // const nftItemContract = tonweb2.Contract('nft_item', Address.parse(ITEM_ADDRESS));
    // return;
    console.log('provider...', provider);
    // try {
    //   // 创建智能合约实例
    const tonweb = new TonWeb(provider);
    console.log('tonweb...', tonweb);

    try {
      // 确保 address 是 TonWeb.utils.Address 类型
      const address = new TonWeb.utils.Address(nftAddress);

      console.log('address...', address);

      // 初始化合约

      // 初始化智能合约实例
      const nftContract = new tonweb.Contract(provider, {
        address,
        // 这里可以添加合约 ABI，如果有的话
      });

      console.log('nftContract...', nftContract);

      // 调用智能合约的方法，例如 `get_nft_data`
      // const nftData = await nftContract.methods.getNftData().call();

      // console.log('NFT 数据:', nftData);
      // return nftData;

      // // 调用合约方法
      // const nftData = await nftContract.getData();

      // console.log('NFT 数据:', nftData);
      // return nftData;
    } catch (error) {
      console.error('读取 NFT 数据时出错:', error);
      return null;
    }

    //   // 调用智能合约的 `get_nft_data` 方法
    //   const response = await contract.methods.getNftData().call();
    //   console.log('NFT Data:', response);
    //   return response;
    // } catch (error) {
    //   console.error('Error fetching NFT data:', error);
    //   return null;
    // }
  };

  const nftAddress = 'EQB58QagLwZHLi-wI-9w1l_Z6OMslZJBB_GcgLezH70Rq62x';

  const connectWallet2 = async () => {
    try {
      if (window.tonProtocolVersion || window.tonProtocolVersion > 1) {
        if (window.ton.isTonWallet) {
          console.log('TON Wallet Extension found!');
        }

        const provider = window.ton;
        const accounts = await provider.send('ton_requestWallets');

        const walletAddress = new TonWeb.utils.Address(accounts[0].address);

        console.log('Connected accounts:', accounts);

        console.log('Connected wallet address:', walletAddress.toString(true, true, true));

        // setWalletAddress(walletAddress);
      } else {
        alert('Please update your TON Wallet Extension 💎');
        location.href =
          '<https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd>';
      }
    } catch (e) {
      console.error(e);
    }
  };

  fetchNFTData(nftAddress).then((data) => {
    if (data) {
      console.log('NFT metadata:', data);
    }
  });

  if (connected) {
    return (
      <Button
        onClick={() => {
          console.log('钱包...');
          getCollectionData();

          // getNftDataByIndex(1);
          return;
          mintNft('0:dafac763b9219799a8f6010d5feb19476da9195b8eeb9ad4f21b64836d320019');
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
