import { useEffect, useMemo, useState } from 'react';
import { $GET } from './request';

export interface IMetadata {
  attributes: string[];
  content_url: string;
  description: string;
  name: string;
  image: string;
}

export const useNft = () => {
  const nftAddress = 'EQAQbKfrIMoRgU6zi0CEY_3nvI1ga1eKVgREDUULKp_38PHa'; // 替换为你的NFT合约地址
  const account = '0:dafac763b9219799a8f6010d5feb19476da9195b8eeb9ad4f21b64836d320019';
  const url = `https://tonapi.io/v2/accounts/${account}/nfts?collection=${nftAddress}`;

  const [myNftMetadata, setMyNftMetadata] = useState<IMetadata[]>([]);

  /**
   * 获取我的nft
   */
  const getMyNft = async () => {
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
  };

  const accountBalanceMTP = useMemo(() => {
    return myNftMetadata?.length * 10000;
  }, [myNftMetadata]);

  useEffect(() => {
    getMyNft();
  }, []);

  return {
    getMyNft,
    myNftMetadata,
    accountBalanceMTP,
    setMyNftMetadata,
  };
};
