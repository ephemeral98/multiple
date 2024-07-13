import { styled } from 'styled-components';
import Point from './Point';
import { useRoadMap } from './useRoadMap';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const RoadMapWrap = styled.div`
  padding-bottom: 103rem;

  main.road-container {
    height: 480rem;
    /* background-color: skyblue; */
    display: grid;
    grid-template-columns: repeat(5, auto);
    justify-content: space-between;
    place-items: center;
    position: relative;
    padding: 0 366rem 0 198rem;
    width: 100%;
    max-width: 1920px;
    margin: 0 auto;

    .bg-wrap {
      height: 200rem;
      position: absolute;
      left: 0;
      top: 50%;

      transform: translateY(-20%);
      .bg-roadmap {
        width: 100%;
        height: 55%;
      }
    }

    .road-item {
      position: absolute;
      width: 371rem;
      transition: all 0.5s;

      &.disable {
        opacity: 0.3;
      }

      .header {
        ${flexPos('flex-start')}
        font-size: 24rem;
        font-weight: 600;
        white-space: nowrap;
        margin-left: -20rem;

        > div {
          &:not(:first-child) {
            margin-left: 7rem;
          }
        }
      }

      .road-item-content {
        font-size: 20rem;
        line-height: 1.2;

        > li {
          position: relative;
          &::before {
            content: '';
            width: 4rem;
            height: 4rem;
            background-color: #fff;
            border-radius: 50%;
            position: absolute;
            left: -15rem;
            top: 9rem;
          }
        }
      }
    }
  }
  .arrow-wrap {
    width: 1400rem;
    margin: 61rem auto 0;
    /* background-color: pink; */

    ${flexPos('flex-end')}

    .icon-arrow {
      width: 100rem;
      cursor: pointer;
    }

    .reverse {
      transform: rotate(180deg);
    }
  }
`;

const RoadMap = () => {
  const { roadMapList, setRoadMapList, changeRoadmap, showingRoads, curInx } = useRoadMap();

  return (
    <RoadMapWrap>
      <main className="road-container">
        <div className="bg-wrap">
          <Image
            priority
            className="bg-roadmap"
            src={require('@img/product/bg-roadmap.png')}
            alt=""
          />
        </div>

        {/* 路线信息 */}
        <div className={`road-item left-[11%] top-320 ${curInx.current !== 0 ? 'disable' : ''}`}>
          <div className="header mb-8">
            <div>{showingRoads[0].season}</div>
            <div>{showingRoads[0].time}</div>
            <div>[{showingRoads[0].title}]</div>
          </div>
          <div className="road-item-content">
            {showingRoads[0].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        <div
          className={`road-item left-[28%] ${curInx.current !== 1 ? 'disable' : ''}`}
          style={{ top: showingRoads[1].yOffset ? showingRoads[1].yOffset : '40rem' }}
        >
          <div className="road-item-content">
            {showingRoads[1].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
          <div className="header mt-8">
            <div>{showingRoads[1].season}</div>
            <div>{showingRoads[1].time}</div>
            <div>[{showingRoads[1].title}]</div>
          </div>
        </div>

        <div className={`road-item left-[45%] top-320 ${curInx.current !== 2 ? 'disable' : ''}`}>
          <div className="header mb-8">
            <div>{showingRoads[2].season}</div>
            <div>{showingRoads[2].time}</div>
            <div>[{showingRoads[2].title}]</div>
          </div>
          <div className="road-item-content">
            {showingRoads[2].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        <div
          style={{ top: showingRoads[3].yOffset ? showingRoads[3].yOffset : '40rem' }}
          className={`road-item left-[62%] top-60 ${curInx.current !== 3 ? 'disable' : ''}`}
        >
          <div className="road-item-content">
            {showingRoads[3].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
          <div className="header mt-8">
            <div>{showingRoads[3].season}</div>
            <div>{showingRoads[3].time}</div>
            <div>[{showingRoads[3].title}]</div>
          </div>
        </div>

        <div
          className={`road-item left-[76%] top-320 ${
            showingRoads[4].title.length > 20 ? 'ml-[-30rem]' : ''
          }
          ${curInx.current < 4 ? 'disable' : ''}
          `}
        >
          <div className="header mb-8">
            <div>{showingRoads[4].season}</div>
            <div>{showingRoads[4].time}</div>
            <div>[{showingRoads[4].title}]</div>
          </div>
          <div className="road-item-content">
            {showingRoads[4].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        {/* 节点 */}
        {roadMapList
          .filter((item, inx) => inx < 5)
          .map((item, inx) => (
            <Point
              active={curInx.current <= 4 ? inx === curInx.current : inx === 4}
              key={item.id}
              style={{ left: item.left, top: '52%' }}
            />
          ))}
      </main>

      <div className="arrow-wrap">
        <Image
          priority
          className="icon-arrow"
          src={require('@img/product/icon-arrow.svg')}
          alt=""
          onClick={() => changeRoadmap(false)}
        />
        <Image
          priority
          className="icon-arrow ml-32 reverse"
          src={require('@img/product/icon-arrow.svg')}
          alt=""
          onClick={() => changeRoadmap(true)}
        />
      </div>
    </RoadMapWrap>
  );
};

export default RoadMap;
