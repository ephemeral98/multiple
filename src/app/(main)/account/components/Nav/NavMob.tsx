'use client';

import { styled } from 'styled-components';
import { EAccountKey, IAccountNav, useNav } from './useNav';
import { FC } from 'react';
import { Tabs, Typography } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;
const style = {
  textAlign: 'center',
  marginTop: 20,
};

const NavMobWrap = styled.div`
  .arco-tabs-header-ink {
    background-color: #fff;
  }
`;

const NavMob: FC<{ navList: IAccountNav[]; onClickNav: (navTag: EAccountKey) => void }> = ({
  navList,
  onClickNav,
}) => {
  return (
    <NavMobWrap>
      <Tabs
        className={''}
        defaultActiveTab="1"
        onClickTab={(e: string) => {
          onClickNav(e as EAccountKey);
        }}
      >
        {navList.map((item) => (
          <TabPane key={item.key} title={item.text}></TabPane>
        ))}
      </Tabs>
    </NavMobWrap>
  );
};

export default NavMob;
