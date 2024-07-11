import { styled } from 'styled-components';
import Point from './Point';
import { useRoadMap } from './useRoadMap';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const RoadMapWrap = styled.div`
  padding-bottom: 103rem;

  main.road-container {
    height: 480rem;
    background-color: skyblue;
    display: grid;
    grid-template-columns: repeat(5, auto);
    justify-content: space-between;
    place-items: center;
    position: relative;
    padding: 0 366rem 0 198rem;
    width: 100%;

    .bg-wrap {
      /* width: 100%; */
      height: 200rem;
      /* background-color: pink; */
      position: absolute;
      left: 0;
      top: 50%;

      transform: translateY(-50%);
      .bg-roadmap {
        width: 100%;
        height: 100%;
      }
    }

    .road-item {
      position: absolute;
      width: 371rem;

      .header {
        ${flexPos('flex-start')}
        font-size: 24rem;
        font-weight: 600;
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
  const { roadMapList, setRoadMapList } = useRoadMap();
  /**
   * 切换路线
   * @param nextRoad
   */
  const switchRoad = (nextRoad: boolean) => {
    const inx = roadMapList.findIndex((item) => item.active);
    const newList = roadMapList.map((item) => {
      item.active = false;
      return item;
    });

    if (nextRoad) {
      if (inx >= newList.length - 1) {
        newList[0].active = true;
      } else {
        newList[inx + 1].active = true;
      }
    } else {
      if (inx <= 0) {
        newList[newList.length - 1].active = true;
      } else {
        newList[inx - 1].active = true;
      }
    }
    setRoadMapList(newList);
  };

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
        <div className="road-item left-[11%] top-320">
          <div className="header mb-8">
            <div>{roadMapList[0].season}</div>
            <div>{roadMapList[0].time}</div>
            <div>[{roadMapList[0].title}]</div>
          </div>
          <div className="road-item-content">
            {roadMapList[0].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        <div className="road-item left-[28%] top-60">
          <div className="road-item-content">
            {roadMapList[0].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
          <div className="header mt-8">
            <div>{roadMapList[0].season}</div>
            <div>{roadMapList[0].time}</div>
            <div>[{roadMapList[0].title}]</div>
          </div>
        </div>

        <div className="road-item left-[45%] top-320">
          <div className="header mb-8">
            <div>{roadMapList[1].season}</div>
            <div>{roadMapList[1].time}</div>
            <div>[{roadMapList[1].title}]</div>
          </div>
          <div className="road-item-content">
            {roadMapList[1].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        <div className="road-item left-[62%] top-60">
          <div className="road-item-content">
            {roadMapList[2].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
          <div className="header mt-8">
            <div>{roadMapList[2].season}</div>
            <div>{roadMapList[2].time}</div>
            <div>[{roadMapList[2].title}]</div>
          </div>
        </div>

        <div className="road-item left-[78%] top-320">
          <div className="header mb-8">
            <div>{roadMapList[3].season}</div>
            <div>{roadMapList[3].time}</div>
            <div>[{roadMapList[3].title}]</div>
          </div>
          <div className="road-item-content">
            {roadMapList[3].content.map((item, inx) => (
              <li key={inx}>{item}</li>
            ))}
          </div>
        </div>

        {/* 节点 */}
        {roadMapList.map((item, inx) => (
          <Point active={item.active} key={inx} style={{ left: item.left, top: '52%' }} />
        ))}
      </main>

      <div className="arrow-wrap">
        <Image
          priority
          className="icon-arrow"
          src={require('@img/product/icon-arrow.svg')}
          alt=""
          onClick={() => switchRoad(false)}
        />
        <Image
          priority
          className="icon-arrow ml-32 reverse"
          src={require('@img/product/icon-arrow.svg')}
          alt=""
          onClick={() => switchRoad(true)}
        />
      </div>
    </RoadMapWrap>
  );
};

export default RoadMap;
