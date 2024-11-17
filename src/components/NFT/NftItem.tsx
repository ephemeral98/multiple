'use client';
import { styled } from 'styled-components';
import Image from 'next/image';

const NftItemWrap = styled.div`
  .nft-content {
    width: 278rem;
    height: 339rem;
    border: solid 1px #d9d9d9;
    border-radius: 10rem;
    padding: 11rem 11rem 16rem;
  }

  .transfer-btn {
    background-color: #fff;
    border-radius: 8rem;
    font-size: 16rem;
    color: #000;
    width: 100%;
    height: 47rem;
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

      <div className="flex-center text-16 mt-16">
        <div>Multiple NFT</div>
        <div className="ml-10">#23321</div>
      </div>
    </NftItemWrap>
  );
};

export default NftItem;
