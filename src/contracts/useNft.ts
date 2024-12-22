import {
  TonClient4,
  TonClient,
  JettonMaster,
  toNano,
  beginCell,
  Address,
  address,
  Cell,
  TupleReader,
} from '@ton/ton';
import { useTonAddress, useTonConnectUI, useTonConnectModal } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import { useWait } from './tools';
import { Message } from '@arco-design/web-react';

const TBNBAddress = 'EQD2WmkfOeDqwUyYOFBqgAYel7eFZH0QPPLw7zEtFIDSDlTA';
// const NFTAddress = 'EQBd0pK29OJXpNSF7-tFy3xzyW_oV256eFpYPj0zwFP9zkf5';
// const NFTAddress = 'EQACI7Hr1vkbYFZHE--n92SfcOXJXPwVDTeqcwEienp4CD09';
export const NFTAddress = 'EQAQbKfrIMoRgU6zi0CEY_3nvI1ga1eKVgREDUULKp_38PHa';
const recipientAddress = 'UQA2JTJpD4UYu-OA0HdXXRKQ90O4GusuWo3I0r6QNEcsxvx6';
const nftContractAddress = 'EQDqJtt45Wl5HFYqMCzzzUeNtsSr2NAtXBmRcRd-5nl-EZ6w'; // NFT 合约地址

export const useNftContract = () => {
  const { client, wait, msgHash, finalizedTx } = useWait();
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

  const tonClient = new TonClient({ endpoint: 'https://mainnet-v4.tonhubapi.com' });

  const [loadBuyNft, setLoadBuyNft] = useState(false);
  const [loadTransfer, setLoadTransfer] = useState(false);

  /**
   * 购买nft
   * @param recipientAddr 接收者地址
   */
  const handleBuyNft = async (recipientAddr?: string): Promise<boolean> => {
    let _recipientAddr = NFTAddress;
    let fee = 1.2;
    // 有优惠码
    if (recipientAddr) {
      _recipientAddr = recipientAddr;
      fee = 1;
    }

    setLoadBuyNft(true);

    const userAddress = Address.parse(tonAddress);
    const jettonMaster = TON_CLIENT.open(JettonMaster.create(TBNB));
    const jettonWallet = await jettonMaster.getWalletAddress(userAddress);

    const forwardPayload = beginCell()
      .storeAddress(Address.parse(_recipientAddr))
      .storeAddress(userAddress)
      .endCell();

    // 构建交易体
    const body = beginCell()
      .storeUint(0xf8a7ea5, 32)
      .storeUint(0, 64) // 可调整的参数，表示交易类型或标识符
      .storeCoins(toNano(fee))
      .storeAddress(NFT) // t-usdt
      .storeAddress(NFT) // 新的所有者地址
      .storeBit(0)
      .storeCoins(toNano(0.1)) // forward_ton_amount:(VarUInteger 16)
      .storeBit(1)
      .storeMaybeRef(forwardPayload) // 可能包含的其他数据，可以是 null
      .endCell();

    // 构建交易消息
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 360, // 设置交易过期时间
      messages: [
        {
          address: jettonWallet.toString(),
          amount: toNano(0.15).toString(), // 转账手续费（gas费用）
          payload: body.toBoc().toString('base64'), // 将交易体编码为 base64
        },
      ],
    };

    const res: any = await tonConnectUI.sendTransaction(transaction).catch(() => {
      Message.error('Cancel');
      setLoadBuyNft(false);
      return false;
    });

    if (!res) {
      return false;
    }

    if (res?.boc) {
      await wait(res.boc);
    }
    // setLoadBuyNft(false);
    if (res) {
      // Message.success('success');
    }
    return true;
    console.log('转成了...', res);
  };

  /**
   * 转nft
   */
  const handleTransferNft = async (
    nftWalletAddr: string,
    recipientAddr: string
  ): Promise<boolean> => {
    setLoadTransfer(true);
    const receiptAddr = Address.parse(recipientAddr);
    // const nftAddrs = Address.parse(nftContractAddress); // NFT 合约地址
    const nftAddrs = Address.parse(nftWalletAddr);

    // 构建交易体
    const body = beginCell()
      .storeUint(0x5fcc3d14, 32) // NFT 转移操作码 0x5fcc3d14
      .storeUint(0, 64) // query_id:uint64

      .storeAddress(receiptAddr) // new_owner:MsgAddress
      .storeAddress(receiptAddr) // response_destination:MsgAddress
      // .storeAddress(Address.parse(tonAddress)) // response_destination:MsgAddress
      .storeUint(0, 1) // custom_payload:(Maybe ^Cell)
      .storeCoins(toNano(0)) // forward_amount:(VarUInteger 16)
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

    const res: any = await tonConnectUI.sendTransaction(transaction).catch(() => {
      Message.error('Cancel');
      setLoadTransfer(false);
      return false;
    });

    if (!res) {
      return false;
    }

    if (res?.boc) {
      await wait(res.boc);
    }
    // setLoadTransfer(false);
    if (res) {
      // Message.success('success');
    }
    return true;

    console.log('转成了...', res);
  };

  /**
   * 判断是否为优惠券
   */
  const coupon = async (address: string): Promise<boolean> => {
    async function encodeAddressToCell(address: string) {
      const addr = Address.parse(address);
      const cell = beginCell().storeAddress(addr).endCell();
      return cell;
    }
    try {
      const tempCell = await encodeAddressToCell(address);
      const resp: any = await client?.runMethod(NFT, 'get_leader_info', [
        { type: 'slice', cell: tempCell },
      ]);

      const temp = resp.stack.items.filter((item: any, inx: number) => inx === 1);
      const nftAddrInx = new TupleReader(temp);

      const addr = nftAddrInx.readNumber();
      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    handleBuyNft,
    handleTransferNft,
    coupon,
    loadBuyNft,
    setLoadBuyNft,
    client,
  };
};

export const isCoupon = async (address: string, client: any): Promise<boolean> => {
  const NFT = Address.parse(NFTAddress);

  async function encodeAddressToCell(address: string) {
    const addr = Address.parse(address);
    const cell = beginCell().storeAddress(addr).endCell();
    return cell;
  }
  try {
    const tempCell = await encodeAddressToCell(address);
    const resp: any = await client?.runMethod(NFT, 'get_leader_info', [
      { type: 'slice', cell: tempCell },
    ]);

    const temp = resp.stack.items.filter((item: any, inx: number) => inx === 1);
    const nftAddrInx = new TupleReader(temp);

    const addr = nftAddrInx.readNumber();
    return true;
  } catch (error) {
    return false;
  }
};
