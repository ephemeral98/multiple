import { useMemo, useState } from 'react';

export enum EAccountKey {
  account = 'account',
  nft = 'nft',
}

export interface IAccountNav {
  key: EAccountKey;
  text: string;
  active: boolean;
}

export const useNav = () => {
  const [navList, setNavList] = useState<IAccountNav[]>([
    {
      key: EAccountKey.account,
      text: 'Account',
      active: true,
    },
    {
      key: EAccountKey.nft,
      text: 'NFT',
      active: false,
    },
  ]);

  const activeNav = useMemo(() => {
    return navList.find((item) => item.active);
  }, [navList]);

  const updateNavByKey = (navKey: EAccountKey) => {
    const newwList = navList.map((item) => {
      item.active = item.key === navKey;
      return item;
    });
    setNavList(newwList);
  };

  return {
    navList,
    activeNav,
    setNavList,
    updateNavByKey,
  };
};
