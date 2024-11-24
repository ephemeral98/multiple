'use client';
import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { ReactNode } from 'react';
import AccountInfo from './AccountInfo';
import NftItem from '@/components/NFT/NftItem';
import { $paddingX, $width, phoneSize } from '@/styled/mediaSize';

const MyAccountWrap = styled.div`
  ${$width('100%', '1100rem', '1100rem')}
  ${$paddingX('60rem', '0', '0')}

  .nft-list {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 24rem;

    @media (max-width: ${phoneSize}) {
      grid-template-columns: repeat(2, auto);
      place-items: center;
      place-content: center;
      grid-gap: 33rem;
    }
  }
`;

const MyAccount: React.FC = () => {
  return (
    <MyAccountWrap>
      <AccountInfo />

      <div className="mt-62 md:mt-72">
        <div className="text-31 md:text-24 mb-33">My NFT</div>

        <div className="nft-list">
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
          <NftItem />
        </div>
      </div>
    </MyAccountWrap>
  );
};

export default MyAccount;
