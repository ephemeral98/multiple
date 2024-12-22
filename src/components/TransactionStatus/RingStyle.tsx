import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';

export const RingStyle = styled.div`
  width: 156rem;
  height: 156rem;
  border-radius: 50%;
  border: solid 10px #2a2a2a;
  padding: 3rem;
  ${flexPos('center')}

  @keyframes spinning {
    0% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(180deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  .spin {
    animation: spinning 2s infinite ease-in-out;
  }
`;
