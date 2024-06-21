'use client';
import { getSlot } from '@/utils';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import initRem from '@/utils/initRem';
import TopBar from '@/components/TopBar';

const Wrap = styled.div`

`;

const Wrapper: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = (props) => {
  const slots = getSlot(props);
  useEffect(() => {
    initRem();
  }, []);

  return (
    <Wrap style={props.style}>
      <TopBar />
      <main>{slots.main}</main>
    </Wrap>
  );
};

export default Wrapper;
