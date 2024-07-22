import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';
import Image from 'next/image';

const ringDuration = '45s';

const ComputerWrap = styled.div`
  height: 180vh;
  ${flexPos('center')}
  flex-direction: column;
  background-color: #008c8c;
  position: relative;
  padding-top: 50rem;

  @keyframes ringMove {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes ringMoveReverse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }

  .ring-wrap {
    position: absolute;
    top: 37%;
    ${flexPos('center')}

    .bg-ring {
      position: absolute;

      &.bg-ring-1 {
        width: 700rem;
        height: 700rem;
        /* background-color: pink; */

        animation: ringMove ${ringDuration} linear infinite;
      }

      &.bg-ring-2 {
        width: 600rem;
        height: 600rem;
        /* background-color: skyblue; */
        animation: ringMoveReverse ${ringDuration} linear infinite;
      }

      &.bg-ring-3 {
        width: 500rem;
        height: 500rem;
        /* background-color: plum; */
        animation: ringMove ${ringDuration} linear infinite;
      }
    }
  }
`;

const Computer: React.FC = () => {
  return (
    <ComputerWrap>
      {/* 圈圈--start */}
      <div className="ring-wrap">
        <Image src={require('@img/home/ring-1.svg')} alt="" className="bg-ring bg-ring-1" />
        <Image src={require('@img/home/ring-2.svg')} alt="" className="bg-ring bg-ring-2" />
        <Image src={require('@img/home/ring-3.svg')} alt="" className="bg-ring bg-ring-3" />
      </div>
      {/* 圈圈--end */}

      <Image src={require('@img/home/face-computer.png')} alt="" className="w-709 z-9" />

      <div className="text-24 text-center mt-50">
        <div>Providing data storage and data transmission services to billions of users</div>
        <div>around the world through DSD-WAN technology architecture</div>
      </div>
    </ComputerWrap>
  );
};

export default Computer;
