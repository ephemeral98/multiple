'use client';
import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { ReactNode, useEffect, useRef, useState } from 'react';
import AccountInfo from './AccountInfo';
import NftItem from '@/components/NFT/NftItem';
import { $paddingX, $width, phoneSize } from '@/styled/mediaSize';
import { useNft } from '@/service/useNft';
import { useTonAddress } from '@tonconnect/ui-react';
import { useNftContract } from '@/contracts/useNft';
import { useModal } from '@/hooks/useModal';
import TransferPop from './TransferPop';
import Pending from '@/components/TransactionStatus/Pending';
import Fail from '@/components/TransactionStatus/Fail';
import Success from '@/components/TransactionStatus/Success';
import { useCountDown, useUpdateEffect } from 'ahooks';
import useNFTStore from '@/store/nftStore';
import { Message } from '@arco-design/web-react';

const MyAccountWrap = styled.div`
  ${$width('100%', '1100rem', '1100rem')}
  ${$paddingX('60rem', '0', '0')}

  .nft-list {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 24rem;
    justify-content: flex-start;

    @media (max-width: ${phoneSize}) {
      grid-template-columns: repeat(2, auto);
      place-items: center;
      place-content: center;
      grid-gap: 33rem;
    }
  }
`;

const MyAccount: React.FC = () => {
  const { handleTransferNft, loadBuyNft } = useNftContract();
  const { getMyNft, myNftMetadata, accountBalanceMTP } = useNft();
  const walletAddress = useTonAddress();
  const tonAddress = useTonAddress(); // 获取当前连接的钱包地址
  const nftStore = useNFTStore();

  const curNft = useRef('');
  const isBuySuccessRef = useRef(false);

  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      // 确定成功转账
      if (isBuySuccessRef.current) {
        Message.success('success');
      } else {
        Message.error('fail');
        showFail({ show: true });
      }
      showPending({ show: false });
    },
  });

  useEffect(() => {
    if (!tonAddress) {
      return;
    }
    getMyNft(tonAddress).then((metadata) => {
      nftStore.setMyNft(metadata);
    });
  }, [tonAddress]);

  useEffect(() => {
    return () => setTargetDate(undefined);
  }, []);

  useUpdateEffect(() => {
    getMyNft(tonAddress).then((resp) => {
      const prevNfts = nftStore.getMyNft();
      if (prevNfts.length > resp.length) {
        isBuySuccessRef.current = true;
        setTargetDate(undefined);
        showSuccess({ show: true });
        nftStore.setMyNft(resp);
        showPending({ show: false });
      }
    });
  }, [countdown]);

  const doTransfer = async (nftWalletAddr: string, recipientAddr: string) => {
    isBuySuccessRef.current = false;
    showTransferPop({ show: false });
    showPending({ show: true });
    const res = await handleTransferNft(nftWalletAddr, recipientAddr);
    console.log('初步打包...', res);

    if (res) {
      setTargetDate(Date.now() + 60000);
    } else {
      showPending({ show: false });
      showFail({ show: true });
    }
  };

  const { toggle: showTransferPop } = useModal(TransferPop, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
    props: {
      onConfirm: doTransfer,
      loadBuyNft: loadBuyNft,
      curNft: curNft.current,
    },
  });

  const { toggle: showPending } = useModal(Pending, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const { toggle: showSuccess } = useModal(Success, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const { toggle: showFail } = useModal(Fail, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
    props: {},
  });

  if (!walletAddress) {
    return (
      <MyAccountWrap>
        <div className="text-24 text-center py-300">No Data...</div>
      </MyAccountWrap>
    );
  }

  return (
    <MyAccountWrap>
      <AccountInfo balance={accountBalanceMTP} />

      <div className="mt-62 md:mt-72">
        <div className="text-31 md:text-24 mb-33">My NFT</div>

        {!myNftMetadata?.length && <div className="text-center my-100">No Data...</div>}

        {!!myNftMetadata?.length && (
          <div className="nft-list">
            {myNftMetadata.map((item, inx) => (
              <NftItem
                key={inx}
                metadata={item}
                onTransfer={(nftAddr) => {
                  curNft.current = nftAddr;
                  showTransferPop({ show: true });
                }}
              />
            ))}
          </div>
        )}
      </div>
    </MyAccountWrap>
  );
};

export default MyAccount;
