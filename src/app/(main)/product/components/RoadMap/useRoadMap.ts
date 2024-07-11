import { useState } from 'react';
export const useRoadMap = () => {
  const [roadMapList, setRoadMapList] = useState([
    {
      season: 'Q4',
      time: '2022',
      title: 'Genesis',
      left: '11%',
      active: true,
      content: [
        `Problem: Pain points in speed and security to serve dynamic AI models`,
        `Proposed Solution: Intelligent data navigation and network architecture`
      ],
    },
    {
      season: 'Q1',
      time: '2023',
      title: 'Validation',
      left: '27.9%',
      active: false,
      content: [`February 2023 Official project launch.`],
    },
    {
      season: 'Q2',
      time: '2023',
      title: 'Angel Investment',
      left: '44.8%',
      active: false,
      content: [
        `Problem: Pain points in speed and security to serve dynamic AI models Proposed Solution: Intelligent data navigation and network architecture`,
      ],
    },
    {
      season: 'Q4',
      time: '2022',
      title: 'Genesis',
      left: '61.8%',
      active: false,
      content: [
        `Problem: Pain points in speed and security to serve dynamic AI models Proposed Solution: Intelligent data navigation and network architecture`,
        `Problem: Pain points in speed and security to serve dynamic AI models Proposed Solution: Intelligent data navigation and network architecture`,
      ],
    },
    {
      season: 'Q4',
      time: '2022',
      title: 'Genesis',
      left: '78.5%',
      active: false,
      content: [
        `Problem: Pain points in speed and security to serve dynamic AI models Proposed Solution: Intelligent data navigation and network architecture`,
      ],
    },
  ]);

  return {
    roadMapList,
    setRoadMapList,
  };
};
