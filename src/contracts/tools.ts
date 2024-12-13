import { Address, beginCell, Cell, loadMessage, storeMessage, Transaction } from '@ton/core';
import { useEffect, useState } from 'react';
import { useTonConnect } from './useTonConnect';
import { TonClient } from '@ton/ton';
import { getHttpEndpoint } from '@orbs-network/ton-access';
import { CHAIN, useTonConnectUI } from '@tonconnect/ui-react';

interface WaitForTransactionOptions {
  address: string;
  hash: string;
  refetchInterval?: number;
  refetchLimit?: number;
}

export const useAsyncInitialize = <T>(func: () => Promise<T>, deps: unknown[] = []) => {
  const [state, setState] = useState<T | undefined>();

  useEffect(() => {
    (async () => {
      setState(await func());
    })();
  }, deps);

  return state;
};

export const useTonClient = () => {
  const { network } = useTonConnect();
  const [client, setClient] = useState<TonClient>();

  useAsyncInitialize(async () => {
    if (!network) return;

    console.log('Network', network);
    const endpoint = await getHttpEndpoint({
      network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
    });

    console.log('endpoint', endpoint);

    const tonClient = new TonClient({ endpoint });
    setClient(tonClient);
  }, [network]);

  return {
    client,
  };
};

const waitForTransaction = async (
  options: WaitForTransactionOptions,
  client: TonClient
): Promise<Transaction | null> => {
  const { hash, refetchInterval = 1000, refetchLimit, address } = options;

  return new Promise((resolve) => {
    let refetches = 0;
    const walletAddress = Address.parse(address);
    const interval = setInterval(async () => {
      refetches += 1;

      console.log('waiting transaction...');
      const state = await client.getContractState(walletAddress);
      if (!state || !state.lastTransaction) {
        clearInterval(interval);
        resolve(null);
        return;
      }
      const lastLt = state.lastTransaction.lt;
      const lastHash = state.lastTransaction.hash;
      const lastTx = await client.getTransaction(walletAddress, lastLt, lastHash);

      if (lastTx && lastTx.inMessage) {
        const msgCell = beginCell().store(storeMessage(lastTx.inMessage)).endCell();

        const inMsgHash = msgCell.hash().toString('base64');
        console.log('InMsgHash', inMsgHash);
        if (inMsgHash === hash) {
          clearInterval(interval);
          resolve(lastTx);
        }
      }
      if (refetchLimit && refetches >= refetchLimit) {
        clearInterval(interval);
        resolve(null);
      }
    }, refetchInterval);
  });
};

export const useWait = () => {
  const { client } = useTonClient();
  const [msgHash, setMsgHash] = useState<string>('');
  const [tonConnectUi] = useTonConnectUI();
  const [finalizedTx, setFinalizedTx] = useState<Transaction | null>(null);

  const wait = async (boc: string) => {
    const hash = Cell.fromBase64(boc).hash().toString('base64');

    const message = loadMessage(Cell.fromBase64(boc).asSlice());
    console.log('message....', message, hash);
    setMsgHash(hash);

    if (client) {
      const txFinalized = await waitForTransaction(
        {
          address: tonConnectUi.account?.address ?? '',
          hash: hash,
        },
        client
      );
      setFinalizedTx(txFinalized);
      console.log('txFinalized...', txFinalized);
    }
  };

  return {
    client,
    wait,
    msgHash,
    finalizedTx,
  };
};
