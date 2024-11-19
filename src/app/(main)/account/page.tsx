'use client';
import { styled } from 'styled-components';
import NavPc from './components/Nav/NavPc';
import { flexPos } from '@/styled/mixin';
import MyAccount from './components/MyAccount';
import { EAccountKey, useNav } from './components/Nav/useNav';
import NftPurchase from './components/NftPurchase';
import NavMob from './components/Nav/NavMob';
import useAppStore from '@/store/appStore';

const AccountWrap = styled.div`
  padding: 147rem 0 373rem;
  height: 100%;
  ${flexPos('center', 'flex-start')}

  .account-container {
    flex: auto;
  }
`;

const Account: React.FC = () => {
  const appStore = useAppStore();
  const { navList, activeNav, updateNavByKey } = useNav();

  return (
    <AccountWrap className={appStore.curDevice === 'phone' ? 'flex-col' : 'flex-row'}>
      {appStore.curDevice === 'phone' ? (
        <NavMob onClickNav={(navKey) => updateNavByKey(navKey)} navList={navList} />
      ) : (
        <NavPc onClickNav={(navKey) => updateNavByKey(navKey)} navList={navList} />
      )}

      {activeNav?.key === EAccountKey.account && <MyAccount />}

      {activeNav?.key === EAccountKey.nft && <NftPurchase />}
    </AccountWrap>
  );
};

export default Account;
