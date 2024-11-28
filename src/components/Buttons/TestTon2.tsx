// import { TonClient, WalletContractV4, internal } from '@ton/ton';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { Address } from '@ton/ton';

import { FC, useEffect } from 'react';
import { styled } from 'styled-components';
import { Contract } from 'tonweb/dist/types/contract/contract';

const TestTon2Wrap = styled.div``;

const TestTon2: FC<{}> = () => {
  const init = async () => {
    const getNftData = async (nftAddress) => {
      // const account = 'UQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGXej';
      const account = '0:dafac763b9219799a8f6010d5feb19476da9195b8eeb9ad4f21b64836d320019';
      // const url = `https://tonapi.io/v2/nfts/collections?address=${nftAddress}`; // 使用 POST 请求的 URL
      // const url = `https://tonapi.io/v2/nfts/collections/${account}/items`; // 使用 POST 请求的 URL

      const url = `https://tonapi.io/v2/accounts/${account}/nfts?collection=${nftAddress}`;
      const body = {
        id: 1, // 添加一个有效的id
        jsonrpc: '2.0', // jsonrpc 的版本号
        method: 'get_nft_data', // 使用正确的方法名
        params: [
          { type: 'address', value: nftAddress }, // 传递NFT合约地址
        ],
      };

      try {
        const response = await fetch(url, {
          method: 'GET', // 使用 POST 请求
          headers: {
            'Content-Type': 'application/json', // 请求体格式是JSON
          },
          // body: JSON.stringify(body), // 将请求体转换为 JSON 字符串
        });

        const data = await response.json(); // 解析响应
        console.log('NFT Data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching NFT data:', error);
      }
    };

    // 调用函数获取NFT数据
    const nftAddress = 'EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0'; // 替换为你的NFT合约地址
    getNftData(nftAddress);
  };

  useEffect(() => {
    init();
  }, []);

  return <TestTon2Wrap></TestTon2Wrap>;
};

export default TestTon2;
