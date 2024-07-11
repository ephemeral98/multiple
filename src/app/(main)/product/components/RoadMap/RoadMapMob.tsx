import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import { useRoadMap } from './useRoadMap';
import Point from './Point';

const RoadMapMobWrap = styled.div`
  /* height: 100vh; */
  margin: 0 38rem 335rem 38rem;
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

const RoadMapMob = () => {
  const { roadMapList, setRoadMapList } = useRoadMap();

  return (
    <RoadMapMobWrap>
      <div className="mask"></div>

      {roadMapList.map((item, index) => (
        <div className="road-item" key={index}>
          <Point
            active={item.active}
            style={{ left: '-78rem', top: '-10rem', opacity: item.active ? 1 : 0 }}
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
  );
};

export default RoadMapMob;
