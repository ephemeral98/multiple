// src/components/LaxWrapper.js
import React, { ReactNode } from 'react';
import { styled } from 'styled-components';

interface IProps {
  children: ReactNode;
}

const LaxScaleWrap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
`;

const LaxScale = ({ children }: IProps) => {
  return <LaxScaleWrap className="lax-scale">{children}</LaxScaleWrap>;
};

export default LaxScale;
