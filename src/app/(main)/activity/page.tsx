'use client';
import { styled } from 'styled-components';
import { Banner } from '@cps/Banner';
import Search from './components/Search';
import Table from './components/Table';
import { Pagination } from '@arco-design/web-react';
import { useModal } from '@/hooks/useModal';
import Rule from './components/Rule';
import { useWhiteList } from '@/service/useActivity';
import { useEffect } from 'react';

const ActivityWraap = styled.div`
  padding-bottom: 152rem;

  .banner-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    white-space: nowrap;
    text-align: center;
    line-height: 1;
  }

  .search-wrap {
    width: 1200rem;
    position: absolute;
    left: 50%;
    top: 89%;
    transform: translate(-50%, -50%);
  }

  .arco-pagination-item {
    height: 36rem;
    width: 36rem;
    font-size: 14rem;

    &:hover {
      background-color: transparent !important;
      border: solid 1rem #fff !important;
      color: #fff !important;
      border-radius: 10rem !important;
    }

    &.arco-pagination-item-next,
    &.arco-pagination-item-prev {
      border: none !important;
    }

    &.arco-pagination-item-active {
      background-color: transparent;
      border: solid 1rem #fff;
      color: #fff;
      border-radius: 10rem;
    }
  }
`;

const Activity: React.FC = () => {
  const { open } = useModal(Rule, {
    maskColor: '#2a2a2aa3',
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
  });

  const {
    pageInfo,
    walletAddr,
    setWalletAddr,
    fetchWhiteList,
    whiteList,
    setWhiteList,
    setPageInfo,
  } = useWhiteList();

  useEffect(() => {
    fetchWhiteList();
  }, []);

  return (
    <ActivityWraap>
      <Banner
        mobBanner={require('@img/common/bg-activity.png')}
        pcBanner={require('@img/common/bg-activity.png')}
      >
        <div className="banner-text text-46 md:text-64 font-bold">
          <div>Testnet Genesis</div>
          <div>Airdrop</div>
        </div>

        <div className="search-wrap px-78">
          <Search
            value={walletAddr}
            onChange={(newVal: string) => {
              setWalletAddr(newVal);
            }}
            onSearch={(e: any) => {
              console.log('eee...', e);
            }}
            onRuleClick={() => open()}
          />
        </div>
      </Banner>
      <Table whiteList={whiteList} />

      <div className="flex-center">
        <Pagination total={200} />
      </div>
    </ActivityWraap>
  );
};

export default Activity;
