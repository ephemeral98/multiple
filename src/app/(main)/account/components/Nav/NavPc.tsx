'use client';

import { styled } from 'styled-components';
import { IAccountNav, useNav } from './useNav';
import { FC } from 'react';

const NavPcWrap = styled.div`
  /* flex: 0 0 421rem; */
  border-right: solid 1px #545454;
  text-align: end;
  margin-right: 32rem;
  height: 100vh;
  padding: 32rem 114rem 32rem 0;

  .nav-item {
    cursor: pointer;
    &:not(:first-child) {
      margin-top: 45rem;
    }
  }
`;

const NavPc: FC<{ navList: IAccountNav[]; onClickNav: (nav: IAccountNav) => void }> = ({
  navList,
  onClickNav,
}) => {
  return (
    <NavPcWrap>
      {navList.map((nav) => (
        <div
          onClick={() => onClickNav(nav)}
          key={nav.tag}
          className={`nav-item ${nav.active && 'active'}`}
        >
          {nav.text}
        </div>
      ))}
    </NavPcWrap>
  );
};

export default NavPc;
