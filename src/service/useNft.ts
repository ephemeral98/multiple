import { useEffect, useMemo, useState } from 'react';
import { $GET } from './request';
import { NFTAddress } from '@/contracts/useNft';
import useNFTStore from '@/store/nftStore';
import { Address } from '@ton/core';

export interface IMetadata {
  attributes: string[];
  content_url: string;
  description: string;
  name: string;
  image: string;
}

export const useNft = () => {
  // const nftStore = useNFTStore();
  // const tonAddress = useTonAddress(); // 获取当前连接的钱包地址
  const [balance, setBalance] = useState('0');
  const [loadGetBalance, setLoadGetBalance] = useState(false);

  const [myNftMetadata, setMyNftMetadata] = useState<IMetadata[]>([]);

  /**
   * 获取我的nft
   */
  const getMyNft = async (addr: string) => {
    const url = `https://tonapi.io/v2/accounts/${addr}/nfts?collection=${NFTAddress}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // 请求体格式是JSON
      },
    });

    const resp = await response.json(); // 解析响应

    console.log('我的nft...', resp);
    const metadata = resp.nft_items.map((item: any) => {
      return item;
    });
    setMyNftMetadata(metadata);
    return metadata;
  };

  /**
   * 获取代币余额
   */
  const getTokenBalance = async (account: string, token: Address) => {
    setLoadGetBalance(true);
    const resp = await $GET(`https://tonapi.io/v2/accounts/${account}/jettons/${token}`).finally(
      () => {
        setLoadGetBalance(false);
      }
    );

    if (!resp.success) {
      setBalance('0');
      return 0;
    }

    setBalance(resp?.balance);
    return resp?.balance;
  };

  const accountBalanceMTP = useMemo(() => {
    return myNftMetadata?.length * 10000;
  }, [myNftMetadata]);

  return {
    getMyNft,
    myNftMetadata,
    accountBalanceMTP,
    setMyNftMetadata,
    getTokenBalance,
    balance,
    loadGetBalance,
  };
};
