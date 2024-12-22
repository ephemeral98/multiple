import { useEffect, useMemo, useState } from 'react';
import { $GET } from './request';
import { useTonAddress } from '@tonconnect/ui-react';
import { NFTAddress } from '@/contracts/useNft';
import useNFTStore from '@/store/nftStore';

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

  const accountBalanceMTP = useMemo(() => {
    return myNftMetadata?.length * 10000;
  }, [myNftMetadata]);

  return {
    getMyNft,
    myNftMetadata,
    accountBalanceMTP,
    setMyNftMetadata,
  };
};
