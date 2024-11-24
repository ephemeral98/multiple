'use client';
import { styled } from 'styled-components';
import Image from 'next/image';
import { $fontSize, $height, $width } from '@/styled/mediaSize';

const NftItemWrap = styled.div`
  .nft-content {
    ${$width('298rem', '278rem', '278rem')}
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

const NftItem: React.FC = () => {
  return (
    <NftItemWrap>
      <section className="nft-content">
        <Image
          className="w-full"
          priority
          src={require('@img/nft/img-nft.png')}
          alt=""
          onClick={() => {
            console.log('click');
          }}
        />

        <button className="transfer-btn">Transfer</button>
      </section>

      <div className="flex justify-between items-center text-23 md:text-16 mt-16">
        <div>Multiple NFT</div>
        <div className="ml-10">#23321</div>
      </div>
    </NftItemWrap>
  );
};

export default NftItem;
