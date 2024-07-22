import { styled } from 'styled-components';
import RoundSpin from './RoundSpin';
import { useEffect, useMemo, useRef, useState } from 'react';
import { swapQueue, turnToLastQueue } from '@/utils';
import { useUpdateEffect } from 'ahooks';

const RoundSpinWrap = styled.div<{ $spinAngle: string }>`
  position: relative;

  .round-content {
    position: absolute;

    width: 300rem;
    height: 300rem;
    /* background-color: skyblue; */
    border-radius: 50%;
    font-size: 30rem;
    border: solid 2px red;
    transition: all 1s;

    &.run {
      transform: ${(props) => (props.$spinAngle ? `rotate(180deg)` : 'rotate(0deg)')};
      transition: all 1s;
    }

    &.ready-run {
      transform: ${(props) => (props.$spinAngle ? `rotate(360deg)` : 'rotate(0deg)')};
      transition: all 1s;
    }

    &.back {
      transform: ${(props) => (props.$spinAngle ? `rotate(-180deg)` : 'rotate(0deg)')};
      /* transition: all 1s; */
    }

    &.ready-back {
      transform: ${(props) => (props.$spinAngle ? `rotate(-360deg)` : 'rotate(0deg)')};
      /* transition: all 1s; */
    }

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
      background-color: #000;
    }

    .up-down {
      transform: rotate(180deg);
    }
  }
`;

const FeedbackWrap = styled.div`
  background-image: url('/static/bg-feedback.png');
  background-size: 100% 100%;
  height: 419rem;
  padding-top: 69rem;
  font-size: 16rem;
`;

const Feedback: React.FC = () => {
  const roundSpinRef = useRef<any>(null);
  const [curAngle, setCurAngle] = useState<number>(0);
  const [readyInx, setReadyInx] = useState<number>(1); // 第一项(准备项)
  const [curUpInx, setCurUpInx] = useState<number>(0);
  const [curDownInx, setCurDownInx] = useState<number>(1);
  const curDir = useRef(true);
  const [curShowInx, setCurShowInx] = useState<number>(0);
  const [curReadyInx, setCurReadyInx] = useState<number>(1);
  const curUpIndex = useRef(0);

  const [roundList, setRoundList] = useState([
    {
      text: '1',
      active: true,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/common/icon-ngc.png'),
      deg: 180,
    },
    {
      text: '2',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/common/icon-ngc.png'),
      deg: 0,
    },
    {
      text: '3',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/common/icon-ngc.png'),
      deg: 0,
    },
    {
      text: '4',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/common/icon-ngc.png'),
      deg: 0,
    },
  ]);

  const handleSpin = (dir: boolean) => {
    if (dir) {
      curDir.current = true;
      // 顺时针 下面：等待动画结束后才改变
      setCurAngle(curAngle + 180);

      // setTimeout(() => {
      //   setRoundList(swapQueue(roundList, 0, 2));
      // }, 1000);

      // setTimeout(() => {
      //   const newList = turnToLastQueue(roundList, 1);
      //   setRoundList(newList);
      // }, 3000);
    } else {
      // 逆时针 下面：立即改变
      curDir.current = false;

      setCurAngle(curAngle - 180);

      // if (readyInx <= 0) {
      //   console.log('<<<<<<0000');
      //   setReadyInx(roundList.length - 1);
      // } else {
      //   console.log('<<<<<<1111');

      //   setReadyInx(readyInx - 1);
      // }
    }
  };

  useEffect(() => {
    console.log('roundSpinRef...', roundSpinRef?.current?.roundSpinRef?.current);
  }, [roundSpinRef]);

  useUpdateEffect(() => {
    if (curDir.current) {
      console.log('readyInx...', readyInx);
      if (readyInx % 2 === 0) {
        // 上面准备
        setCurUpInx(readyInx);
      } else {
        // 下面准备
        setCurDownInx(readyInx);
      }
    } else {
      console.log('反向');
      if (readyInx % 1 === 0) {
        // 上面准备
        setCurUpInx(readyInx);
      } else {
        // 下面准备
        setCurDownInx(readyInx);
      }
    }
  }, [readyInx, curDir]);

  return (
    <FeedbackWrap>
      {/* <RoundSpin
        onEnd={() => {
          if (curDir.current) {
            console.log('eenenenen', readyInx);
            if (readyInx >= roundList.length - 1) {
              setReadyInx(0);
            } else {
              setReadyInx(readyInx + 1);
            }
          } else {
            console.log('readyInxrrrr...', readyInx);
            if (readyInx <= 0) {
              setReadyInx(roundList.length - 1);
            } else {
              console.log('ddddd');
              setReadyInx(readyInx - 1);
            }
          }
        }}
        ref={roundSpinRef}
        spinAngle={curAngle}
        roundList={roundList}
        upRoundItem={roundList[curUpInx]}
        downRoundItem={roundList[curDownInx]}
      /> */}
      {/* className={`round-content ${item.active ? 'run' : ''} ${
                item.readyRun ? 'ready-run' : ''
              } ${item.back ? 'back' : ''} ${item.readyBack ? 'ready-back' : ''} `}
              key={item.text} */}
      <RoundSpinWrap $spinAngle={String(curDir.current)}>
        {roundList.map((item, inx) => {
          return (
            <div className="round-content" style={{ transform: `rotate(${item.deg}deg)` }}>
              <div className={`round-down ${(item.deg / 180) % 2 !== 0 ? 'up-down' : ''}`}>
                {item.text}
              </div>
            </div>
          );
        })}
      </RoundSpinWrap>

      <button
        onClick={() => {
          handleSpin(false);

          // setCurShowInx(curShowInx + 1);

          // const inx = roundList.findIndex((item) => item.active);
          // const newList = roundList.map((item, i) => {
          //   // item.active = i === inx + 1;
          //   // return item;
          //   item.active = false;
          //   item.readyRun = false;

          //   if (i === curUpIndex.current) {
          //     item.readyBack = true;
          //     item.back = false;
          //   } else if (i === curUpIndex.current - 1) {
          //     item.readyBack = false;
          //     item.back = true;
          //   } else {
          //     item.back = false;
          //     item.readyBack = false;
          //   }
          //   return item;
          // });
          // setRoundList(newList);
          // curUpIndex.current--;

          const newList = roundList.map((item, i) => {
            console.log('item...', i, item.deg);
            if (i === curUpIndex.current) {
              item.deg -= 180;
            } else if (i === curUpIndex.current - 1) {
              item.deg -= 180;
            } else if (curUpIndex.current <= 0) {
              if (i === roundList.length - 1) {
                item.deg -= 180;
              }
            }
            return item;
          });
          setRoundList(newList);
          if (curUpIndex.current <= 0) {
            console.log('111');
            curUpIndex.current = roundList.length - 1;
          } else {
            console.log('2322');

            curUpIndex.current--;
          }
        }}
      >
        ------
      </button>
      <button
        onClick={() => {
          handleSpin(true);
          // setCurShowInx(curShowInx + 1);

          const inx = roundList.findIndex((item) => item.active);
          // const newList = roundList.map((item, i) => {
          //   // item.active = i === inx + 1;
          //   // return item;
          //   if (i === curUpIndex.current) {
          //     item.readyRun = true;
          //     item.active = false;
          //   } else if (i === curUpIndex.current + 1) {
          //     item.readyRun = false;
          //     item.active = true;
          //   } else {
          //     item.active = false;
          //     item.readyRun = false;
          //   }
          //   return item;
          // });
          // setRoundList(newList);
          // curUpIndex.current++;

          console.log('curUpIndex.current...', curUpIndex.current);

          const newList = roundList.map((item, i) => {
            console.log('item...', i, item.deg);
            if (i === curUpIndex.current) {
              item.deg += 180;
            } else if (i === curUpIndex.current + 1) {
              item.deg += 180;
            } else if (curUpIndex.current >= roundList.length - 1) {
              if (i === 0) {
                item.deg += 180;
              }
            }
            return item;
          });
          setRoundList(newList);
          if (curUpIndex.current >= roundList.length - 1) {
            console.log('111');
            curUpIndex.current = 0;
          } else {
            console.log('2322');

            curUpIndex.current++;
          }
        }}
      >
        +++++++
      </button>
    </FeedbackWrap>
  );
};

export default Feedback;
