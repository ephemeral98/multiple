import { FC, useState } from 'react';
import { TonClient4, JettonMaster, toNano, beginCell, Address, address } from '@ton/ton';
import { useTonAddress, useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';
import { styled } from 'styled-components';
import TonWeb from 'tonweb';

const TestTon2Wrap = styled.div``;

// 假设这是 NFT 合约地址和购买 NFT 所需的代币数量
const nftContractAddress = 'EQDt2lZoKGLU-So2AUmpt50A0RzSW0Gb3NPlyp--j8_rYJB9'; // NFT 合约地址
const nftItemId = 6; // 购买的 NFT ID
const nftPriceInNano = '1.5'; // 购买 NFT 所需的代币数量（单位：TON）

const BuyNFT: FC = () => {
  const tonAddress = useTonAddress(); // 获取当前连接的钱包地址
  const [tonConnectUI] = useTonConnectUI();
  const { open } = useTonConnectModal();
  const TON_CLIENT = new TonClient4({
    // endpoint: 'https://white-aged-hexagon.ton-mainnet.quiknode.pro/0cc99bb0182b5bfeb249a10a7770cf2d98e0af77',
    // endpoint: 'https://toncenter.com',
    endpoint: 'https://mainnet-v4.tonhubapi.com',
    timeout: 30000,
  });

  // 购买 NFT 函数
  const buyNFT = async (nftId: number, nftPrice: number | string) => {
    if (!tonAddress) {
      open(); // 如果没有连接钱包，打开钱包连接界面
      return;
    }

    console.log('Buying NFT ID:', nftId, 'Price:', nftPrice, 'TON');

    try {
      // const TBNB = Address.parse(
      //   '0:0d4374952ba5e6fc3f73bddbbf890f0cb9cdfcc4c1f75251a5cf4f889de573ce'
      // );
      const TBNB = Address.parse('EQD2WmkfOeDqwUyYOFBqgAYel7eFZH0QPPLw7zEtFIDSDlTA');
      const USDT = Address.parse('EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs');

      const newNftAddr = Address.parse('EQBd0pK29OJXpNSF7-tFy3xzyW_oV256eFpYPj0zwFP9zkf5');
      // const newNftAddr = Address.parse(
      //   '0:f3124062565626eb53fa2c9ddbaec1b032d8d4a488f98dfdf14375af4a0e5cee'
      // );
      const nftAddrs = Address.parse(nftContractAddress); // NFT 合约地址
      const recipientAddress = Address.parse('UQA2JTJpD4UYu-OA0HdXXRKQ90O4GusuWo3I0r6QNEcsxvx6'); // 用户的钱包地址

      // const jettonMasterAddress = Address.parse(config.tpxContract);  // tpx 合约的代币地址
      // const destinationAddress = Address.parse(config.depositReceive); // 接收地址
      const userAddress = Address.parse(tonAddress);
      const jettonMaster = TON_CLIENT.open(JettonMaster.create(TBNB));
      const jettonWallet = await jettonMaster.getWalletAddress(userAddress);

      const nftMaster = TON_CLIENT.open(JettonMaster.create(newNftAddr));
      console.log(
        'nftWallet...',
        newNftAddr.toString(),
        nftMaster.address,
        nftMaster.address.toString(),
        nftMaster.toString()
      );
      // const nftWallet = await nftMaster.getWalletAddress(userAddress);

      // console.log('recipientAddress...', recipientAddress.toString());
      console.log('exec nftAddrs....', nftAddrs.toString());
      console.log('TBNB...', TBNB.toString());
      console.log('newNftAddr...', newNftAddr.toString());

      const forwardPayload = beginCell().endCell();

      // 构建交易体
      const body = beginCell()
        .storeUint(0xf8a7ea5, 32)
        .storeUint(0, 64) // 可调整的参数，表示交易类型或标识符
        // .storeCoins(toNano(0.00005)) // NFT 价格作为交易金额
        .storeCoins(toNano(1.21))

        // .storeCoins(2) // NFT 价格作为交易金额
        .storeAddress(newNftAddr) // t-usdt
        .storeAddress(newNftAddr) // 新的所有者地址
        // .storeUint(nftId, 64) // NFT 的 ID
        // .storeCoins(toNano('1.2'))
        // .storeMaybeRef(forwardPayload) // 可能包含的其他数据，可以是 null
        .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
        // .storeCoins(toNano(0.00001)) // forward_ton_amount:(VarUInteger 16)
        .storeCoins(toNano(0.1)) // forward_ton_amount:(VarUInteger 16)
        .storeUint(0, 1)
        .endCell();

      // const forwardPayload = new TextEncoder().encode(recipientAddress.toString()); // 将接收者地址转为字节序列
      // 构建交易消息
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360, // 设置交易过期时间
        messages: [
          {
            // address: TBNB.toString(), // NFT 合约地址
            // address: '0:0d4374952ba5e6fc3f73bddbbf890f0cb9cdfcc4c1f75251a5cf4f889de573ce',
            address: jettonWallet.toString(),
            amount: toNano(0.16).toString(), // 转账手续费（gas费用）
            payload: body.toBoc().toString('base64'), // 将交易体编码为 base64
            // destination: recipientAddress,
            // responseDestination: recipientAddress,
            // forwardPayload: forwardPayload.toString(),
          },
          // {
          //   address: nftAddrs.toString(), // NFT 合约地址
          //   amount: toNano('0.15').toString(), // 转账手续费（gas费用）
          //   payload: body.toBoc().toString('base64'), // 将交易体编码为 base64
          //   destination: recipientAddress,
          //   responseDestination: recipientAddress,
          //   forwardPayload: forwardPayload.toString(),
          // },
        ],
      };

      // 通过 TonConnectUI 发送交易
      const res = await tonConnectUI.sendTransaction(transaction);

      console.log('转成了...', res);
      // alert('NFT purchase successful!');
    } catch (error) {
      console.log('报错了：Error purchasing NFT:', error);
      // alert('Error purchasing NFT');
    }
  };

  function hexToBytes(hex: any) {
    for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
    return new Uint8Array(bytes);
  }

  const handleTransfer = async () => {
    const { NftCollection, NftItem, NftMarketplace, NftSale } = TonWeb.token.nft;
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
    const seed = hexToBytes('16ef4ba09eac9ab5c1f919ed7a7e913483435d1a8e5f88f0eb1a6831837ace81');
    // console.log('seed...', seed);
    // const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSecretKey(seed);
    // TonWeb.utils.
    const WalletClass = tonweb.wallet.all['v3R2'];
    const wallet = new WalletClass(tonweb.provider, {
      // publicKey: keyPair.publicKey,
      publicKey: seed,
      wc: 0,
    });
    const nftAddress = new TonWeb.utils.Address('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');
    const myAddress = new TonWeb.utils.Address('EQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGSpm');
    const nftItem = new NftItem(tonweb.provider, { address: nftAddress });

    const seqno = (await wallet.methods.seqno().call()) || 0;
    console.log({ seqno });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // const amount = TonWeb.utils.toNano(BigInt(1));
    const amount = '0.04';

    wallet.methods.transfer;

    console.log(
      await wallet.methods
        .transfer({
          // secretKey: keyPair.secretKey,
          secretKey: seed,
          toAddress: await nftAddress,
          amount: amount,
          seqno: seqno,
          payload: await nftItem.createTransferBody({
            newOwnerAddress: myAddress,
            // forwardAmount: TonWeb.utils.toNano(0.02),
            forwardAmount: amount,
            forwardPayload: new TextEncoder().encode('gift'),
            responseAddress: myAddress,
          }),
          sendMode: 3,
        })
        .send()
        .catch((e) => console.log(e))
    );
  };

  const tempTransfer = async () => {
    const { NftCollection, NftItem, NftMarketplace, NftSale } = TonWeb.token.nft;
    const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));
    const seed = hexToBytes(
      '8b113467f4d4437f60b9b49bb1cafa2d79b7140e23fd2a4c32f960b7d4ed77955e74d2c2da031684d436e41de46bf195da473ee45b1a7ca9bb8cdc44cdc6e05c'
    );
    const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSecretKey(seed);
    const WalletClass = tonweb.wallet.all['v3R2'];
    const wallet = new WalletClass(tonweb.provider, {
      publicKey: keyPair.publicKey,
      wc: 0,
    });
    const nftAddress = new TonWeb.utils.Address('EQBjGEQSQDux2pCmOwiudgYx0wO4CnxjAjakgeMgpMst3lk6');
    const myAddress = new TonWeb.utils.Address('EQC38-cbo1HivDOdH0oOzyZfTKVpSkatn1ydXJYsrg5KvLNI');
    const nftItem = new NftItem(tonweb.provider, { address: nftAddress });

    const seqno = (await wallet.methods.seqno().call()) || 0;
    console.log({ seqno });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // const amount = TonWeb.utils.toNano(0.04);
    const amount = '1';

    console.log(
      await wallet.methods
        .transfer({
          secretKey: keyPair.secretKey,
          toAddress: await nftAddress,
          amount: amount,
          seqno: seqno,
          payload: await nftItem.createTransferBody({
            newOwnerAddress: myAddress,
            forwardAmount: amount,
            forwardPayload: new TextEncoder().encode('gift'),
            responseAddress: myAddress,
          }),
          sendMode: 3,
        })
        .send()
        .catch((e) => console.log(e))
    );
  };

  return (
    <TestTon2Wrap>
      <div
        className="w-100 h-50 bg-pink"
        onClick={() => {
          console.log('Initiating purchase...');
          buyNFT(nftItemId, nftPriceInNano); // 传递 NFT ID 和购买价格
          // handleTransfer();
          // tempTransfer();
        }}
      >
        Buy NFT
      </div>
    </TestTon2Wrap>
  );
};

export default BuyNFT;
