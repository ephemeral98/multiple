import { phoneSize } from '@/styled/mediaSize';
import { FC, ReactNode } from 'react';
import { styled } from 'styled-components';

const ProductHeaderWrap = styled.div`
  @media (max-width: ${phoneSize}) {
    padding: 0 38rem;
  }
`;

export const ProductHeader: FC<{
  children: ReactNode;
}> = ({ children }) => {
  return (
    <ProductHeaderWrap>
      <div className="text-up text-46 md:text-64 font-bold md:text-center mb-79">{children}</div>
    </ProductHeaderWrap>
  );
};
