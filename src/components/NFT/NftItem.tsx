'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import { $fontSize, $height, $width } from '@/styled/mediaSize';
import { IMetadata } from '@/service/useNft';
import { Address } from '@ton/core';

const NftItemWrap = styled.div`
  ${$width('298rem', '278rem', '278rem')}
  .nft-content {
    width: 100%;
    ${$height('363rem', '339rem', '339rem')}
    border: solid 1px #d9d9d9;
    border-radius: 10rem;
    padding: 11rem 11rem 16rem;
  }

  .transfer-btn {
    ${$fontSize('23rem', '16rem', '16rem')}
    ${$height('50rem', '47rem', '47rem')}
    background-color: #fff;
    border-radius: 8rem;
    color: #000;
    width: 100%;
    margin-top: 9rem;
  }
`;

const NftItem: React.FC<{ metadata: any; onTransfer: (nftAddr: string) => void }> = ({
  metadata,
  onTransfer,
}) => {
  return (
    <NftItemWrap>
      <section className="nft-content">
        <img src={metadata.metadata.image} alt="" className="w-full" />

        <button className="transfer-btn" onClick={() => onTransfer(metadata.address)}>
          Transfer
        </button>
      </section>

      <div className="flex justify-between md:justify-center items-center text-23 md:text-16 mt-16">
        <div>{metadata.metadata.name}</div>
        <div className="ml-10">#{metadata.index}</div>
      </div>
    </NftItemWrap>
  );
};

export default NftItem;
