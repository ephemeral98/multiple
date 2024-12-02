'use client';

import { styled } from 'styled-components';
import { EAccountKey, IAccountNav, useNav } from './useNav';
import { FC } from 'react';
import { Tabs, Typography } from '@arco-design/web-react';
const TabPane = Tabs.TabPane;

const NavMobWrap = styled.div`
  width: 100%;
  margin-bottom: 52rem;

  .arco-tabs-header-title {
    font-size: 31rem;
    color: #fff;

    &.arco-tabs-header-title-active {
      color: #fff;
      font-size: 46rem;
    }
  }

  .arco-tabs-header-nav-line .arco-tabs-header-title:hover .arco-tabs-header-title-text::before {
    background-color: transparent !important;
  }

  .arco-tabs-header-nav {
    &::before {
      height: 0;
    }
  }

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
        className={'w-full'}
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
