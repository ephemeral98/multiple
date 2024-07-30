import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { useRoadMapList } from './useRoadMap';
import Point from './Point';
import { FC, useRef, useState } from 'react';
import { useUpdateRef, useEleScrollWay } from '@/hooks';
import { ProductHeader } from '../Header';

const RoadMapMobWrap = styled.div`
  /* height: 100vh; */
  margin: 0 38rem 150rem 38rem;
  padding: 40rem 0 40rem 48rem;
  border-left: 2rem solid #5858589e;
  position: relative;
  height: 300vh;
  /* background-color: skyblue; */

  .roadmap-container {
    /* background-color: pink; */
    position: sticky;
    top: 0;
  }

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
  const { roadMapList, setRoadMapList } = useRoadMapList();
  const [curActiveInx, updateCurActiveInx] = useUpdateRef<number>(0); // 用于激活的索引

  const { targetRef } = useEleScrollWay({
    onChange(payload) {},
    onScroll(payload) {
      if (payload.top > 0) {
        curActiveInx.current = 0;
      } else {
        const per = payload.height / roadMapList.length;
        const inx = Math.abs(Math.floor(payload.top / per));
        curActiveInx.current = inx;
      }
      updateCurActiveInx();
    },
    scrollThrottleTime: 200,
  });

  return (
    <>
      <RoadMapMobWrap ref={targetRef}>
        {/* <div className="mask"></div> */}

        <div className="roadmap-container">
          <ProductHeader>roadmap</ProductHeader>

          {roadMapList.map((item, index) => (
            <div className="road-item" key={index}>
              <Point
                active={true}
                style={{
                  left: '-78rem',
                  top: '-10rem',
                  opacity: curActiveInx.current === index ? 1 : 0,
                }}
              />

              <div className="header">
                <div>{item.season}</div>
                <div>{item.time}</div>
                <div>[{item.title}]</div>
              </div>
              <div className="road-item-content">
                {item.content.map((item, inx) => (
                  <div key={inx}>{item}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RoadMapMobWrap>
    </>
  );
};

export default RoadMapMob;
