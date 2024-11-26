import { Address, TonClient, TupleReader, Tuple, Cell } from '@ton/ton';
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

    const myAddr = Address.parse('UQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGXej');
    console.log('我的地址i：：：', myAddr.toString());

    // const address = Address.parse('UQDa-sdjuSGXmaj2AQ1f6xlHbakZW47rmtTyG2SDbTIAGXej');
    console.log('client.runMethod...', client.runMethod);
    // const address2 = new TonWeb.utils.Address('EQCe18j7pOFw9-oqZ-JW3a8NRgMU6-7cPnV_BLgQnnxGiAO0');

    // try {
    //   let { stack } = await client.callGetMethod(address, 'get_collection_data');
    //   let nextItemIndex = stack.readBigNumber();
    //   let contentRoot = stack.readCell();
    //   let owner = stack.readAddress();

    //   console.log('Next item index:', nextItemIndex.toString());
    //   console.log('Content root:', contentRoot);
    //   console.log('Owner:', owner);
    // } catch (error) {
    //   console.error('Error fetching collection data:', error);
    // }

    // client.runMethod(address, 'get_collection_data', []).then((resp) => {
    //   console.log('respppp...', resp.stack);
    //   // console.log('respppp...', resp.stack.items[1].cell.toString());

    //   const tt = resp.stack.items.filter((item, inx) => inx === 2);

    //   const r = new TupleReader(tt);
    //   console.log('rrrrrr', r.readAddress().toString());
    // });

    for (let i = 0, len = 7; i < len; i++) {
      client
        .runMethod(address, 'get_nft_address_by_index', [{ type: 'int', value: BigInt(i) }])
        .then((resp) => {
          console.log('respppp222...', resp);
          // const temp = resp.stack.items[0].cell.beginParse();
          // console.log('temp222...', temp);

          const nftAddrInx = new TupleReader(resp.stack.items);
          console.log('nftAddrInx....', nftAddrInx);

          const addr = nftAddrInx.readAddress().toString();
          console.log('nftAddrInx2222', addr);

          client.runMethod(Address.parse(addr), 'get_nft_data', []).then((resp) => {
            console.log('resppppsss...', resp.stack);
            const tt = resp.stack.items.filter((item, inx) => inx === 3);
            const r = new TupleReader(tt);

            const tt1 = resp.stack.items.filter((item, inx) => inx === 1);
            const r1 = new TupleReader(tt1);
            const res1 = r1.readNumber();
            console.log('res1...', res1);

            const tt2 = resp.stack.items.filter((item, inx) => inx === 4);
            console.log('tt2222', tt2);
            const r2 = new TupleReader(tt2);

            const res2 = r2.readString();
            console.log('res2...', res2);

            const tt3 = resp.stack.items.filter((item, inx) => inx === 0);
            const r3 = new TupleReader(tt3);
            console.log('r3333', r3.readBoolean());

            const target = tt2[0].cell.toBoc();

            console.log('tt222.cell', target);
            // const individualContent = Cell.fromBoc(tt2[0].cell);
            // console.log('individualContent...', individualContent);

            // const params = Tuple.fromItems([index, individualContent]);

            client
              .runMethod(address, 'get_nft_content', [
                { type: 'int', value: BigInt(res1) },
                { type: 'cell', cell: tt2[0].cell },
              ])
              .then((resp) => {
                console.log('get_nft_content...', resp.stack);

                const r = new TupleReader(resp.stack.items);
                console.log('rrrr', r.readString());
              });
          });
        });
    }
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
