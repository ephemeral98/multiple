'use client';
import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { ReactNode } from 'react';
import AccountInfo from './AccountInfo';
import NftItem from '@/components/NFT/NftItem';

const MyAccountWrap = styled.div`
  width: 1100rem;

  .nft-list {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-gap: 24rem;
  }
`;

const MyAccount: React.FC = () => {
  return (
    <MyAccountWrap>
      <AccountInfo />

      <div className="mt-72">
        <div className="text-24 mb-33">My NFT</div>

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
