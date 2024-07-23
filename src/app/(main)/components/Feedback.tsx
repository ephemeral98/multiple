import { styled } from 'styled-components';
import RoundSpin from './RoundSpin';
import { useEffect, useMemo, useRef, useState } from 'react';
import { swapQueue, turnToLastQueue } from '@/utils';
import { useUpdateEffect } from 'ahooks';
import { flexPos } from '@/styled/mixin';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import TitleWrap from '@cps/Title';

const RoundSpinWrap = styled.div<{ $spinAngle: string }>`
  position: absolute;
  /* width: 100%; */
  /* height: 100%; */
  /* margin: 0 auto; */
  width: 300rem;
  height: 300rem;

  .round-content {
    position: absolute;
    /* transform: translate(50%, 50%); */
    /* left: 50%;
    top: 50%; */
    width: 300rem;
    height: 300rem;
    /* background-color: skyblue; */
    border-radius: 50%;
    font-size: 30rem;
    /* border: solid 2px red; */
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
    }

    .up-down {
      transform: rotate(180deg) translateX(50%);
    }
  }
`;

const FeedbackWrap = styled.div`
  background-image: url('/static/bg-feedback.png');
  background-size: 100% 100%;
  height: 419rem;
  /* padding-top: 69rem; */
  font-size: 16rem;
  position: relative;

  ${flexPos('center')}

  .bg-line {
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translateX(-50%);
    width: 667rem;
  }

  .feedback-main {
    position: relative;
    z-index: 9;
    /* padding-top: 169rem; */
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .mask {
      flex: 0 0 200;
    }

    .feedback-main-content {
      flex: auto;
      ${flexPos('center', 'flex-start')}
      transition: all 1s;

      background-image: linear-gradient(to bottom, transparent 0%, #000 20%);
    }
  }
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
      avatar: require('@img/home/avatar1.png'),
      name: 'Emma Sullivan',
      content: [
        `Multiple Network is a game-changer that lets me share my internet resources and benefit from it. It’s a win-win for everyone involved.`,
      ],
      deg: 180,
    },
    {
      text: '2',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/home/avatar1.png'),
      name: 'Emma Sullivan',
      content: [
        `Multiple Network is a game-changer that lets me share my internet resources and benefit from it. It’s a win-win for everyone involved.`,
      ],
      deg: 0,
    },
    {
      text: '3',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/home/avatar1.png'),
      name: 'Emma Sullivan',
      content: [
        `Multiple Network is a game-changer that lets me share my internet resources and benefit from it. It’s a win-win for everyone involved.`,
      ],
      deg: 0,
    },
    {
      text: '4',
      active: false,
      readyRun: false,
      back: false,
      readyBack: false,
      avatar: require('@img/home/avatar1.png'),
      name: 'Emma Sullivan',
      content: [
        `Multiple Network is a game-changer that lets me share my internet resources and benefit from it. It’s a win-win for everyone involved.`,
      ],
      deg: 0,
    },
  ]);

  const handleSpin = (dir: boolean) => {
    if (dir) {
      curDir.current = true;
      // 顺时针 下面：等待动画结束后才改变
      setCurAngle(curAngle + 180);
    } else {
      // 逆时针 下面：立即改变
      curDir.current = false;
      setCurAngle(curAngle - 180);
    }
  };

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

  const doPrev = () => {
    handleSpin(false);

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
  };

  const doNext = () => {
    handleSpin(true);
    // setCurShowInx(curShowInx + 1);

    const inx = roundList.findIndex((item) => item.active);

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
  };

  return (
    <>
      <TitleWrap className="mb-80 mt-320">Everyone's feedback</TitleWrap>
      <FeedbackWrap>
        <Image priority className="bg-line" src={require('@img/home/bg-feedbac-line.png')} alt="" />

        {/* <div className="w-full h-[30%] absolute bottom-0 bg-#000 z-2"></div> */}

        <RoundSpinWrap $spinAngle={String(curDir.current)}>
          {roundList.map((item, inx) => {
            return (
              <div key={inx} className="round-content" style={{ transform: `rotate(${item.deg}deg)` }}>
                <div className={`round-down ${(item.deg / 180) % 2 !== 0 ? 'up-down' : ''}`}>
                  <Image priority className="w-76 rounded-[50%]" src={item.avatar} alt="" />
                </div>
              </div>
            );
          })}
        </RoundSpinWrap>

        <main className="feedback-main">
          <div className="h-200 mask"></div>

          <div className="feedback-main-content">
            <Image
              onClick={() => doPrev()}
              priority
              className="w-34 transform rotate-180 translate-y-[50%] cursor-pointer"
              src={require('@img/home/icon-arrow.svg')}
              alt=""
            />

            <section className="w-430 text-center mx-150">
              <div className="text-24">
                {roundList[curUpIndex.current].name} {roundList[curUpIndex.current].text}
              </div>
              <div className="text-16">{roundList[curUpIndex.current].content}</div>
            </section>

            <Image
              onClick={() => doNext()}
              priority
              className="w-34 cursor-pointer"
              src={require('@img/home/icon-arrow.svg')}
              alt=""
            />
          </div>
        </main>
      </FeedbackWrap>
    </>
  );
};

export default Feedback;
