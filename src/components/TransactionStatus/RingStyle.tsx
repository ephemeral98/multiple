import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';

export const RingStyle = styled.div`
  width: 156rem;
  height: 156rem;
  border-radius: 50%;
  border: solid 10px #2a2a2a;
  padding: 3rem;
  ${flexPos('center')}
`;
