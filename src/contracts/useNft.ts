import { TonClient4, JettonMaster, toNano, beginCell, Address, address } from '@ton/ton';
import { useTonAddress, useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';

const TBNBAddress = 'EQD2WmkfOeDqwUyYOFBqgAYel7eFZH0QPPLw7zEtFIDSDlTA';
const NFTAddress = 'EQBd0pK29OJXpNSF7-tFy3xzyW_oV256eFpYPj0zwFP9zkf5';
const recipientAddress = 'UQA2JTJpD4UYu-OA0HdXXRKQ90O4GusuWo3I0r6QNEcsxvx6';
const nftContractAddress = 'EQDqJtt45Wl5HFYqMCzzzUeNtsSr2NAtXBmRcRd-5nl-EZ6w'; // NFT 合约地址

export const useNftContract = () => {
  const tonAddress = useTonAddress(); // 获取当前连接的钱包地址
  const [tonConnectUI] = useTonConnectUI();

  const TBNB = Address.parse(TBNBAddress);
  const NFT = Address.parse(NFTAddress);

  const TON_CLIENT = new TonClient4({
    // endpoint: 'https://white-aged-hexagon.ton-mainnet.quiknode.pro/0cc99bb0182b5bfeb249a10a7770cf2d98e0af77',
    // endpoint: 'https://toncenter.com',
    endpoint: 'https://mainnet-v4.tonhubapi.com',
    timeout: 30000,
  });

  /**
   * 购买nft
   */
  const handleBuyNft = async () => {
    const userAddress = Address.parse(tonAddress);
    const jettonMaster = TON_CLIENT.open(JettonMaster.create(TBNB));
    const jettonWallet = await jettonMaster.getWalletAddress(userAddress);

    // 构建交易体
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32)
      .storeUint(0, 64) // 可调整的参数，表示交易类型或标识符
      // .storeCoins(toNano(0.00005)) // NFT 价格作为交易金额
      .storeCoins(toNano(1.21))

      // .storeCoins(2) // NFT 价格作为交易金额
      .storeAddress(NFT) // t-usdt
      .storeAddress(NFT) // 新的所有者地址
      // .storeUint(nftId, 64) // NFT 的 ID
      // .storeCoins(toNano('1.2'))
      // .storeMaybeRef(forwardPayload) // 可能包含的其他数据，可以是 null
      .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
      // .storeCoins(toNano(0.00001)) // forward_ton_amount:(VarUInteger 16)
      .storeCoins(toNano(0.1)) // forward_ton_amount:(VarUInteger 16)
      .storeUint(0, 1)
      .endCell();

    // 构建交易消息
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360, // 设置交易过期时间
      messages: [
        {
          address: jettonWallet.toString(),
          amount: toNano(0.16).toString(), // 转账手续费（gas费用）
          payload: body.toBoc().toString('base64'), // 将交易体编码为 base64
        },
      ],
    };

    const res = await tonConnectUI.sendTransaction(transaction);
    console.log('转成了...', res);
  };

  /**
   * 转nft
   */
  const handleTransferNft = async () => {
    const receiptAddr = Address.parse(recipientAddress);
    const nftAddrs = Address.parse(nftContractAddress); // NFT 合约地址

    // 构建交易体
    const body = beginCell()
      .storeUint(0x5fcc3d14, 32) // NFT 转移操作码 0x5fcc3d14
      .storeUint(0, 64) // query_id:uint64

      .storeAddress(receiptAddr) // new_owner:MsgAddress
      .storeAddress(receiptAddr) // response_destination:MsgAddress
      // .storeAddress(Address.parse(tonAddress)) // response_destination:MsgAddress
      .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
      .storeCoins(toNano(0.1)) // forward_amount:(VarUInteger 16)
      .storeUint(0, 1) // forward_payload:(Either Cell ^Cell)
      .endCell();

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360, // 设置交易过期时间
      messages: [
        {
          address: nftAddrs.toString(),
          amount: toNano('0.05').toString(), // 转账手续费（gas费用）
          payload: body.toBoc().toString('base64'), // 将交易体编码为 base64
        },
      ],
    };

    const res = await tonConnectUI.sendTransaction(transaction);
    console.log('转成了...', res);
  };

  return {
    handleBuyNft,
    handleTransferNft,
  };
};
