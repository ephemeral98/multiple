import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface INav {
  text: string;
  path: string;
  active: boolean;
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
