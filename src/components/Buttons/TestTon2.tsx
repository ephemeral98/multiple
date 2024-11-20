// import { TonClient, WalletContractV4, internal } from '@ton/ton';
import { mnemonicNew, mnemonicToPrivateKey } from '@ton/crypto';
import { TonClient, Address } from '@ton/core';

import { FC, useEffect } from 'react';
import { styled } from 'styled-components';
import { Contract } from 'tonweb/dist/types/contract/contract';

const TestTon2Wrap = styled.div``;

const TestTon2: FC<{}> = () => {
  const init = async () => {
    // 创建客户端
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    });

    // 合约地址，需要替换成你的合约地址
    const contractAddress = '你的合约地址';

    // 创建合约实例
    const contract = new Contract({
      client,
      address: Address.parse(contractAddress),
      abi: [
        {
          // 这里假设你有ABI定义，需要根据实际情况调整
          name: 'get_collection_data',
          inputs: [],
          outputs: [
            { name: 'next_item_index', type: 'uint32' },
            { name: 'collection_content', type: 'string' },
            { name: 'owner_address', type: 'address' },
          ],
        },
      ],
    });

    // 调用 get_collection_data 方法
    const { next_item_index, collection_content, owner_address } = await contract.methods
      .get_collection_data()
      .call();

    console.log('Next item index:', next_item_index);
    console.log('Collection content:', collection_content);
    console.log('Owner address:', owner_address.toString());
  };

  useEffect(() => {
    init();
  }, []);

  return <TestTon2Wrap></TestTon2Wrap>;
};

export default TestTon2;
