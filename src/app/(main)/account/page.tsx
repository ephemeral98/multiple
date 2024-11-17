'use client';
import { styled } from 'styled-components';
import NavPc from './components/Nav/NavPc';
import { flexPos } from '@/styled/mixin';
import MyAccount from './components/MyAccount';
import { EAccountTag, useNav } from './components/Nav/useNav';
import NftPurchase from './components/NftPurchase';

const AccountWrap = styled.div`
  padding: 147rem 0 373rem;
  height: 100%;
  ${flexPos('center', 'flex-start')}

  .account-container {
    flex: auto;
  }
`;

const Account: React.FC = () => {
  const { navList, activeNav, updateNav } = useNav();

  return (
    <AccountWrap>
      <NavPc onClickNav={(navItem) => updateNav(navItem)} navList={navList} />

      {activeNav?.tag === EAccountTag.account && <MyAccount />}

      {activeNav?.tag === EAccountTag.nft && <NftPurchase />}
    </AccountWrap>
  );
};

export default Account;
