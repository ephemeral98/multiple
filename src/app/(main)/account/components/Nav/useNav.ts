import { useMemo, useState } from 'react';

export enum EAccountTag {
  account = 'account',
  nft = 'nft',
}

export interface IAccountNav {
  tag: EAccountTag;
  text: string;
  active: boolean;
}

export const useNav = () => {
  const [navList, setNavList] = useState<IAccountNav[]>([
    {
      tag: EAccountTag.account,
      text: 'Account',
      active: true,
    },
    {
      tag: EAccountTag.nft,
      text: 'NFT',
      active: false,
    },
  ]);

  const activeNav = useMemo(() => {
    return navList.find((item) => item.active);
  }, [navList]);

  const updateNav = (nav: IAccountNav) => {
    const newwList = navList.map((item) => {
      item.active = item.tag === nav.tag;
      return item;
    });
    setNavList(newwList);
  };

  return {
    navList,
    activeNav,
    setNavList,
    updateNav,
  };
};
