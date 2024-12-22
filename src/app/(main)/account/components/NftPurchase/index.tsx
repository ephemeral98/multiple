'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import Rules from './Rules';
import { useModal } from '@/hooks/useModal';
import BuyNftPop from './BuyNftPop';
import { useState } from 'react';
import {
  $borderRadius,
  $fontSize,
  $height,
  $marginBottom,
  $marginTop,
  $marginX,
  $width,
  phoneSize,
} from '@/styled/mediaSize';
import useAppStore from '@/store/appStore';
import { useNftContract } from '@/contracts/useNft';
import { useTonAddress, useTonConnectModal } from '@tonconnect/ui-react';
import Pending from '@/components/TransactionStatus/Pending';
import Fail from '@/components/TransactionStatus/Fail';
import Success from '@/components/TransactionStatus/Success';
import { useCountDown, useUpdateEffect } from 'ahooks';
import { useNft } from '@/service/useNft';
import useNFTStore from '@/store/nftStore';
import { Message } from '@arco-design/web-react';

const NftPurchaseWrap = styled.div`
  ${$width('100%', '1100rem', '1100rem')}

  .purchase-info {
    /* flex flex-col md:flex-row mb-72 */
    display: flex;
    ${$marginBottom('87rem', '72rem', '72rem')}

    @media (max-width: ${phoneSize}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .purchase-face {
      ${$width('396rem', '351rem', '351rem')}
      ${$height('396rem', '351rem', '351rem')}
      border-radius: 10rem;
      padding: 12rem;
      border: solid 1px #d9d9d9;
    }

    .purchase-face-info {
      ${$width('396rem', '351rem', '351rem')}
    }
  }

  .inp {
    ${$width('99rem', '63rem', '63rem')}
    ${$fontSize('31rem', '24rem', '24rem')}
    border: none;
    text-align: center;
    color: #fff;
    ${$marginX('8rem', '5rem', '5rem')}
  }

  .buy-btn {
    ${$width('629rem', '370rem', '370rem')}
    ${$height('115rem', '70rem', '70rem')}
    ${$borderRadius('19rem', '10rem', '10rem')}
    ${$fontSize('27rem', '16rem', '16rem')}
    ${$marginTop('123rem', '105rem', '105rem')}
    color: #000;
    background-color: #fff;
  }
`;

const NftPurchase: React.FC = () => {
  const walletAddress = useTonAddress();
  const { open: connectWallet, close, state } = useTonConnectModal();
  const { getMyNft, myNftMetadata, accountBalanceMTP } = useNft();
  const tonAddress = useTonAddress();
  const { handleBuyNft, loadBuyNft, coupon, client, setLoadBuyNft } = useNftContract();
  const nftStore = useNFTStore();
  const [targetDate, setTargetDate] = useState<number>();
  const appStore = useAppStore();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => {
      // 确定成功转账
      Message.success('success');
    },
  });

  useUpdateEffect(() => {
    getMyNft(tonAddress).then((resp) => {
      const prevNfts = nftStore.getMyNft();
      if (prevNfts.length < resp.length) {
        setTargetDate(undefined);
        showSuccess({ show: true });
        nftStore.setMyNft(resp);
      }
    });
  }, [countdown]);

  const handleBuy = async (recipientAddr: string) => {
    showBuyNftPop({ show: false });
    showPending({ show: true });
    const res = await handleBuyNft(recipientAddr);
    showPending({ show: false });
    setLoadBuyNft(false);

    if (res) {
      setTargetDate(Date.now() + 20000);
    } else {
      showFail({ show: true });
    }
  };

  const { toggle: showBuyNftPop } = useModal(BuyNftPop, {
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
    props: {
      onBuy: handleBuy,
      loadBuyNft: loadBuyNft,
      client,
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

  return (
    <NftPurchaseWrap>
      {appStore.curDevice !== 'phone' && (
        <div className="font-bold mb-31 text-24">Purchase NFT</div>
      )}

      <section className="purchase-info">
        <div className="purchase-face md:mr-33">
          <Image className="w-full" priority src={require('@img/nft/img-nft.png')} alt="" />
        </div>

        <div>
          <div className="purchase-face-info mx-auto font-bold text-31 md:mt-24 mt-23 md:mt-0 flex justify-center">
            <span>Multiple NFT </span>
            {/* <span className="ml-20">#23321</span> */}
          </div>
          <div className="flex-center flex-col md:flex-row text-center md:text-start mt-45">
            <div className="md:mr-54">
              <div className="text-23 md:text-14">Price</div>
              <div className="mt-8 text-31 md:text-24">
                <span>1200</span>
                <span className="text-17 ml-8">USDT</span>
              </div>
            </div>
          </div>

          <button
            className="buy-btn"
            onClick={() => {
              // showSuccess();
              // return;
              if (!walletAddress) {
                connectWallet();
                return;
              }
              showBuyNftPop({ show: true });
            }}
          >
            BUY NOW
          </button>
        </div>
      </section>

      <Rules />
    </NftPurchaseWrap>
  );
};

export default NftPurchase;
