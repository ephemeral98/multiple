'use client';
import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { ReactNode, useRef } from 'react';
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

  const curNft = useRef('');

  const doTransfer = async (nftWalletAddr: string, recipientAddr: string) => {
    const res = await handleTransferNft(nftWalletAddr, recipientAddr);

    getMyNft(tonAddress);
  };

  const { open } = useModal(TransferPop, {
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

  const { open: showPending } = useModal(Pending, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const { open: showSuccess } = useModal(Success, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const { open: showFail } = useModal(Fail, {
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
                  open();
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
