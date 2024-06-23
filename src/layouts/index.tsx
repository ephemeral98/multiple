'use client';
import { getSlot } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import TopBar from '@cps/TopBar';
import TopBarMob from '@cps/TopBar/TopBarMob';
import useAppStore from '@/store/appStore';
import Footer from '@cps/Footer';
import FooterMob from '@cps/Footer/FooterMob';

const Wrap = styled.div``;

const Wrapper: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = (props) => {
  const appStore = useAppStore();
  const slots = getSlot(props);

  return (
    <Wrap style={props.style}>
      {appStore.curDevice === 'phone' ? <TopBarMob /> : <TopBar />}

      <main>{slots.main}</main>

      {appStore.curDevice === 'phone' ? <FooterMob /> : <Footer />}
    </Wrap>
  );
};

export default Wrapper;
