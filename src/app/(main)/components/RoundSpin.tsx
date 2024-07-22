import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { styled } from 'styled-components';
import Image from 'next/image';

interface IProps {
  spinAngle: number;
  roundList: any[];
  upRoundItem: any;
  downRoundItem: any;

  onEnd: () => void;
}

const RoundSpinWrap = styled.div<{ $spinAngle: string }>`
  position: relative;
  width: 300rem;
  height: 300rem;
  background-color: skyblue;
  border-radius: 50%;
  transform: ${(props) => (props.$spinAngle ? `rotate(${props.$spinAngle}deg)` : 'rotate(0deg)')};
  transition: all 1s;

  .round-up {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: pink;
  }

  .round-down {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    background-color: pink;
  }
`;

const RoundSpin = forwardRef((props: IProps, ref) => {
  const roundSpinRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    roundSpinRef: roundSpinRef,
  }));

  return (
    <>
      <RoundSpinWrap
        onTransitionEnd={() => props.onEnd()}
        $spinAngle={String(props.spinAngle)}
        ref={roundSpinRef}
      >
        <div className="round-up rounded-[50%] text-50">
          {props.upRoundItem.text}
          <Image priority className="w-100 rounded-[50%]" src={props.upRoundItem.avatar} alt="" />
        </div>

        <div className="round-down rounded-[50%]">
          {props.downRoundItem.text}
          <Image priority className="w-100 rounded-[50%]" src={props.downRoundItem.avatar} alt="" />
        </div>
      </RoundSpinWrap>
    </>
  );
});

export default RoundSpin;
