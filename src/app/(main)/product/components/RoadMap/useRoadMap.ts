import { useState, useMemo, useRef, useEffect } from 'react';
import { useUpdateRef } from '@/hooks';

export const useRoadMap = () => {
  const [roadMapList, setRoadMapList] = useState([
    {
      id: 1,
      season: 'Q4',
      time: '2022',
      title: 'Genesis',
      left: '11%',
      active: true,
      content: [
        `Problem: Pain points in speed and security to serve dynamic AI models`,
        `Proposed Solution: Intelligent data navigation and network architecture`,
      ],
    },
    {
      id: 2,
      yOffset: '137rem',
      season: 'Q1',
      time: '2023',
      title: 'Validation',
      left: '27.9%',
      active: false,
      content: [`February 2023 Official project launch.`],
    },
    {
      id: 3,
      yOffset: '158rem',
      season: 'Q2',
      time: '2023',
      title: 'Angel Investment',
      left: '44.8%',
      active: false,
      content: [`Beginning of pre-seed fundraising.`],
    },
    {
      id: 4,
      yOffset: '130rem',
      season: 'Q3',
      time: '2023',
      title: 'Product Development',
      left: '61.8%',
      active: false,
      content: [`Completion of backend network architecture`],
    },
    {
      id: 5,
      yOffset: '106rem',
      season: 'Q4',
      time: '2023',
      title: 'Comprehensive Optimization',
      titleOffset: 20,
      left: '78.5%',
      active: false,
      content: [`Testing and debugging`, `Optimization of front end UI/UX design`],
    },
    {
      id: 6,
      season: 'Q1',
      time: '2024',
      title: 'MVP',
      left: '78.5%',
      active: false,
      content: [
        `Launch of MVP`,
        `Continuous optimisation of Multiple’s network layer`,
        `Onboarding of initial users and bandwidth providers`,
        `Tokenomics Design`,
      ],
    },
    {
      id: 7,
      season: 'Q4',
      time: '2024',
      title: 'Investment & Listing',
      left: '78.5%',
      active: false,
      content: [
        `Deployment on TON’s Testnet`,
        `Beginning of Series B round of investment`,
        `Launching the beta version of our product on Mainnet`,
      ],
    },
    {
      id: 8,
      season: 'Q1',
      time: '2025',
      title: 'Open build!',
      left: '78.5%',
      active: false,
      content: [
        `Listing of Multiple Network’s utility token on 3 major CEXs`,
        `Opening of Multiple’s network interface to encourage building and creation of more applications on our network`,
      ],
    },
    {
      id: 9,
      season: 'Q2',
      time: '2025',
      title: 'Design and Expansion',
      left: '78.5%',
      active: false,
      content: [
        `Achieving 200,000 users and nodes within Multiple Network’s ecosystem`,
        `Designing proprietary hardware to facilitate the expansion of our dedicated SD-WAN network layer`,
      ],
    },
    {
      id: 10,
      season: 'Q3',
      time: '2025',
      title: 'Hardware launch',
      left: '78.5%',
      active: false,
      content: [
        `Launch of dedicated routers to enable retail bandwidth providers to contribute to Multiple Network`,
        `Designing proprietary hardware to facilitate the expansion of our dedicated SD-WAN network layer`,
      ],
    },
    {
      id: 11,
      season: 'Q4',
      time: '2025',
      title: 'Strategic partnerships',
      left: '78.5%',
      active: false,
      content: [
        `Integration of our transmission service with industry partners`,
        `(e.g. DePIN compute and storage providers)`,
      ],
    },
  ]);

  const [curInx, updateCurInx] = useUpdateRef(0);

  // const curInx = useRef(0);
  const lastInx = useRef(4); // 展示的最后一项(游标)

  const changeRoadmap = (nextRoad: boolean) => {
    if (nextRoad && curInx.current < roadMapList.length - 1) {
      curInx.current++;
      updateCurInx();
    } else if (!nextRoad && curInx.current > 0) {
      curInx.current--;
      updateCurInx();
    }
  };

  const showingRoads = useMemo(() => {
    console.log('cur...', curInx.current, lastInx.current, roadMapList);
    if (curInx.current > lastInx.current) {
      const diff = curInx.current - lastInx.current;
      const temp = roadMapList.filter((item, inx) => {
        if (inx > diff - 1 && inx < curInx.current + 1) {
          return item;
        }
      });

      console.log('temp2...', temp);
      return temp;
    }

    return roadMapList.filter((item, inx) => {
      return inx <= 4;
    });
  }, [curInx.current]);

  return {
    curInx,
    roadMapList,
    showingRoads,
    changeRoadmap,
    setRoadMapList,
  };
};
