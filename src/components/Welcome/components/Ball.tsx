import { styled } from 'styled-components';

const BallWrap = styled.div`
  @keyframes move {
    0% {
      transform: translate(-200px, -50%);
    }

    100% {
      transform: translate(200px, -50%);
    }
  }

  width: 515rem;
  height: 515rem;
  background-color: #000;
  /* background-color: #fff; */
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  filter: blur(80px);
  z-index: 999;
  animation: move 2s infinite ease-in-out alternate;
`;

const Ball = () => {
  return <BallWrap></BallWrap>;
};

export default Ball;
