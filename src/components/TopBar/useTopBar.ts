import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface INav {
  text: string;
  path: string;
  active: boolean;
  link?: string;
}

export const useTopBar = () => {
  const pathname = usePathname();

  const [navList, setNavList] = useState<INav[]>([
    {
      text: 'About Us',
      path: '/about',
      active: false,
    },
    {
      text: 'Product',
      path: '/product',
      active: false,
    },
    {
      text: 'Blog',
      path: '/blog',
      active: false,
    },
    {
      text: 'Activity',
      path: '/activity',
      active: false,
    },
    {
      text: 'Docs',
      path: '',
      link: 'https://multiple-network.gitbook.io/multiple-network-gitbook/',
      active: false,
    },
  ]);

  useEffect(() => {
    setNavList(
      navList.map((it) => {
        it.active = pathname === it.path;
        return it;
      })
    );
  }, [pathname]);

  return {
    navList,
    setNavList,
  };
};
