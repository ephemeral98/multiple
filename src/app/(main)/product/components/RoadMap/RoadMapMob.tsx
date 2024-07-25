import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { useRoadMap } from './useRoadMap';
import Point from './Point';
import { Affix } from '@arco-design/web-react';
import { FC, useRef, useState } from 'react';
import { useUpdateRef } from '@/hooks';
import { useDebounce } from '@/hooks/useDeb';

const RoadMapMobWrap = styled.div`
  /* height: 100vh; */
  margin: 0 38rem 1200rem 38rem;
  padding: 40rem 0 40rem 48rem;
  border-left: 2rem solid #5858589e;
  position: relative;

  .road-item {
    position: relative;

    &:not(:first-child) {
      margin-top: 87rem;
    }

    .header {
      ${flexPos('flex-start')}
      font-size: 31rem;
      font-weight: 600;
      margin-bottom: 15rem;

      > div {
        &:not(:first-child) {
          margin-left: 7rem;
        }
      }
    }

    .road-item-content {
      font-size: 23rem;
      line-height: 1.2;
    }
  }

  .mask {
    width: 100%;
    height: 300rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom, transparent, #0000009e 80%);
    z-index: 9;
  }
`;

const RoadMapMob: FC<{
  onEnd?: () => void;
}> = (props) => {
  const { roadMapList, setRoadMapList } = useRoadMap();
  const deb = useDebounce();

  const isLocked = useRef(true);

  const curInx = useRef<number>(0); // 当前索引
  const [curActiveInx, updateCurActiveInx] = useUpdateRef<number>(0); // 用于激活的索引
  const baseHeight = useRef<number>(0); // 基础高度
  const totalHeight = useRef<number>(0); // 页面总高度
  const perHeight = useRef<number>(0); // 每个高度

  const lockCurActiveInx = useRef(false);

  const [isEnd, setIsEnd] = useState(false);

  const calcHeight = () => {
    // 获取滚动条高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    console.log('scrollTop..', scrollTop);
    // 获取页面文档高度
    const pageHeight = document.documentElement.scrollHeight;
    console.log('pageHeight..', pageHeight);
    const diff = pageHeight - scrollTop;
    const per = diff / roadMapList.length;

    baseHeight.current = scrollTop;
    totalHeight.current = pageHeight;
    perHeight.current = per;
  };

  const handleScroll = () => {
    const curHeight = document.documentElement.scrollTop || document.body.scrollTop;

    if (curHeight >= baseHeight.current + perHeight.current * curInx.current) {
      if (curActiveInx.current < roadMapList.length - 1 && !lockCurActiveInx.current) {
        lockCurActiveInx.current = true;
        curActiveInx.current++;
        updateCurActiveInx();
      }
    }

    if (curHeight >= baseHeight.current + perHeight.current * (curInx.current + 1)) {
      if (curInx.current < roadMapList.length - 1) {
        lockCurActiveInx.current = false;
        curInx.current++;
      }
    }
    console.log('curActiveInx.current >= roadMapList.length - 1...', roadMapList.length - 2);
    if (curActiveInx.current >= roadMapList.length - 2) {
      // setIsEnd(true);
      // props.onEnd?.();
    }
  };

  const handleScrollDown = () => {
    const curHeight = document.documentElement.scrollTop || document.body.scrollTop;

    // console.log(
    //   'scccccc',
    //   curHeight,
    //   baseHeight.current,
    //   totalHeight.current,
    //   perHeight.current,
    //   curInx.current
    // );
    // console.log('aaaal≤≥≥≥', baseHeight.current + perHeight.current * curInx.current);
    // console.log('ixixixixix', curActiveInx.current, curInx.current);
    console.log('--------------', curHeight, baseHeight.current, perHeight.current, curInx.current);
    console.log('++++++++++++++++', baseHeight.current + perHeight.current * curInx.current);

    if (curHeight < baseHeight.current + perHeight.current * curInx.current) {
      if (curActiveInx.current > 0 && !lockCurActiveInx.current) {
        lockCurActiveInx.current = true;
        curActiveInx.current--;
        console.log('减少了....');
        updateCurActiveInx();
      }
    }

    if (curHeight < baseHeight.current + perHeight.current * (curInx.current - 1)) {
      if (curInx.current > 0) {
        console.log('减少了2....');

        lockCurActiveInx.current = false;
        curInx.current--;
      }
    }
    console.log('curActiveInx.current >= roadMapList.length - 1...', roadMapList.length - 2);
    if (curActiveInx.current >= roadMapList.length - 2) {
      // setIsEnd(true);
      // props.onEnd?.();
    }
  };

  const startY = useRef(0);
  function getTouchstartY(event: any) {
    startY.current = event.changedTouches[0].pageY;
  }

  function handleTouchMove(event: any) {
    // console.log('event...', Object.keys(event));
    // console.log('event22...', event.touches);
    // console.log('event33...', event);
    // console.log('start----------start');
    /* for (const key in event) {
      console.log('key...', key);
    } */

    // console.log('event targetTouches....', event.targetTouches);
    // console.log('event target....', event.target?.__vnode?.props?.class);
    // console.log('event touches....', event.touches);
    // console.log('end----------end');

    // 如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按
    // event.preventDefault()
    let moveEndY = event.changedTouches[0].pageY;
    // console.log('moveveevevve', moveEndY);
    let Y = moveEndY - startY.current; //如果值为正,则代表手指下滑,反则则为上滑,为0则表示点击
    if (Y > 0) {
      // 手机触摸下滑

      deb(() => {
        console.log('手机触摸下滑...');
      });
    } else if (Y < 0) {
      // 手机触摸上滑

      deb(() => {
        console.log('手机触摸上滑...');
      });
    } else {
      console.log('just touch');
    }
  }

  function handleWheel(e: any) {
    // if(e.path.includes(''))
    // 这里简单做一个兼容
    if (isLocked.current) {
      return;
    }
    const delta = e.deltaY ?? e.wheelDelta;

    if (delta > 0) {
      // 鼠标滑轮上滑
      handleScroll();

      deb(() => {
        console.log('鼠标滑轮上滑...');
        handleScroll();
      });
    } else {
      // 鼠标滑轮下滑
      handleScrollDown();

      deb(() => {
        console.log('鼠标滑轮下滑...');
        handleScrollDown();
      });
    }
  }

  return (
    <>
      <Affix
        onChange={(isStick: boolean) => {
          if (isStick) {
            calcHeight();
            isLocked.current = false;
            // 监听浏览器滚动条
            // window.addEventListener('scroll', handleScroll);
          } else {
            // window.removeEventListener('scroll', handleScroll);
            isLocked.current = true;
          }
        }}
      >
        <RoadMapMobWrap
          onWheel={handleWheel}
          onTouchMove={handleTouchMove}
          onTouchStart={getTouchstartY}
        >
          <div className="mask"></div>

          {roadMapList.map((item, index) => (
            <div className="road-item" key={index}>
              <Point
                active={true}
                style={{
                  left: '-78rem',
                  top: '-10rem',
                  opacity: curActiveInx.current - 1 === index ? 1 : 0,
                }}
              />

              <div className="header">
                <div>{item.season}</div>
                <div>{item.time}</div>
                <div>[{item.title}]</div>
              </div>
              <div className="road-item-content">
                {item.content.map((item, inx) => (
                  <li key={inx}>{item}</li>
                ))}
              </div>
            </div>
          ))}
        </RoadMapMobWrap>
      </Affix>

      {!isEnd && <div className="h-400vh"></div>}
    </>
  );
};

export default RoadMapMob;
