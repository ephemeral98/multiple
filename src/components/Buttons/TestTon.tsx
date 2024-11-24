import { Address, TonClient, TupleReader } from '@ton/ton';
import { FC, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TonWeb from 'tonweb';

const TestTonWrap = styled.div``;

const TestTon: FC<{}> = () => {
  const [walletAddress, setWalletAddress] = useState<string>('');

  const fetchAccountData = async () => {
    console.log('qaaaa');
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: '16ef4ba09eac9ab5c1f919ed7a7e913483435d1a8e5f88f0eb1a6831837ace81', // 替换为你的 API Key
    });

    const address = Address.parse('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');
    // const address = Address.parse('UQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGXej');
    console.log('client.runMethod...', client.runMethod);
    // const address2 = new TonWeb.utils.Address('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');

    client.runMethod(address, 'get_collection_data', []).then((resp) => {
      console.log('respppp...', resp.stack);
      // console.log('respppp...', resp.stack.items[1].cell.toString());

      const tt = resp.stack.items.filter((item, inx) => inx > 0);

      const r = new TupleReader(tt);
      console.log('rrrrrr', r.readString());
      // console.log('respppp...', resp.stack.items[0].cell.beginParse().toString());
      // const t = resp.stack.read;
      // console.log('ttt', t);
      // console.log('222', JSON.stringify(resp));
      // const reader = new TupleReader(resp.stack);
      // console.log('reader....', reader);

      // console.log('Remaining items in stack:', reader.remaining());
      // for (let i = 0; i < reader.remaining(); i++) {
      //   console.log(`Item ${i + 1}:`, stack[i]);
      // }
      // return;
      // const t = resp.stack.items;
      // console.log('ttt', t);

      // // stack 是 TupleReader 类型
      // const reader = new TupleReader(t);

      // // 解析数据
      // const ownerAddress = reader.readCell().beginParse().loadAddress();
      // const nextItemIndex = reader.readNumber();
      // const collectionContentCell = reader.readCell();

      // // 如果元数据是字符串，解码 Cell
      // const metadataUri = collectionContentCell.beginParse().loadStringTail();

      // console.log('Owner Address:', ownerAddress.toString(true, true, true));
      // console.log('Next Item Index:', nextItemIndex);
      // console.log('Collection Metadata URI:', metadataUri);
    });

    client
      .runMethod(address, 'get_nft_address_by_index', [{ type: 'int', value: 0 }])
      .then((resp) => {
        // console.log('respppp222...', resp);
        const temp = resp.stack.items[0].cell.beginParse();
        console.log('temp...', temp);
      });
    // const accountState = await client.getAccountState(address);
    // console.log('Account Data:', accountState);
  };

  const handleMint = async () => {
    console.log('qaaaa');
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
      apiKey: '16ef4ba09eac9ab5c1f919ed7a7e913483435d1a8e5f88f0eb1a6831837ace81', // 替换为你的 API Key
    });

    const address = Address.parse('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');
    // const address = Address.parse('UQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGXej');
    console.log('client.runMethod...', client.runMethod);
    // const address2 = new TonWeb.utils.Address('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');

    client.runMethod(address, 'get_collection_data').then((resp) => {
      console.log('respppp...', resp.stack.items);
      // console.log('respppp...', resp.stack.items[1].cell.toString());

      const tt = resp.stack.items.filter((item, inx) => inx > 0);

      const r = new TupleReader(tt);
      console.log('rrrrrr', r.readString());
      // console.log('respppp...', resp.stack.items[0].cell.beginParse().toString());
      // const t = resp.stack.read;
      // console.log('ttt', t);
      // console.log('222', JSON.stringify(resp));
      // const reader = new TupleReader(resp.stack);
      // console.log('reader....', reader);

      // console.log('Remaining items in stack:', reader.remaining());
      // for (let i = 0; i < reader.remaining(); i++) {
      //   console.log(`Item ${i + 1}:`, stack[i]);
      // }
      // return;
      // const t = resp.stack.items;
      // console.log('ttt', t);

      // // stack 是 TupleReader 类型
      // const reader = new TupleReader(t);

      // // 解析数据
      // const ownerAddress = reader.readCell().beginParse().loadAddress();
      // const nextItemIndex = reader.readNumber();
      // const collectionContentCell = reader.readCell();

      // // 如果元数据是字符串，解码 Cell
      // const metadataUri = collectionContentCell.beginParse().loadStringTail();

      // console.log('Owner Address:', ownerAddress.toString(true, true, true));
      // console.log('Next Item Index:', nextItemIndex);
      // console.log('Collection Metadata URI:', metadataUri);
    });

    client
      .runMethod(address, 'get_nft_address_by_index', [{ type: 'int', value: 0 }])
      .then((resp) => {
        // console.log('respppp222...', resp);
        const temp = resp.stack.items[0].cell.beginParse();
        console.log('temp...', temp);
      });
    // const accountState = await client.getAccountState(address);
    // console.log('Account Data:', accountState);
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  return (
    <div>
      <button className="fixed left-0 top-0 w-full h-100vh bg-pink-1" onClick={fetchAccountData}>
        Fetch Data
      </button>
    </div>
  );
};

export default TestTon;
