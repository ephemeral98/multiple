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
import { useSyncCallback } from '@/hooks';
import { $fontSize, $height, $width } from '@/styled/mediaSize';
import { flexPos } from '@/styled/mixin';
import EmptyTable from './components/EmptyTable';
import useAppStore from '@/store/appStore';

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
    ${$width('100%', '100%', '1200rem')}
    position: absolute;
    left: 50%;
    top: 89%;
    transform: translate(-50%, -50%);
  }

  .arco-pagination-list {
    ${flexPos('center')}
  }

  .arco-pagination-item {
    ${$height('70rem', '36rem', '36rem')}
    ${$width('70rem', '36rem', '36rem')}
    ${$fontSize('26rem', '14rem', '14rem')}
    ${flexPos('center')}
    color: #5c5c5c;

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
  return <div></div>
  const appStore = useAppStore();

  const { open } = useModal(Rule, {
    maskColor: '#2a2a2aa3',
    animate: {
      enterActive: 'animate__animated animate__fadeIn',
      exitActive: 'animate__animated animate__fadeOut',
    },
    className: 'rule-modal-wrap',
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

  const refetchWhiteList = useSyncCallback(() => {
    fetchWhiteList(walletAddr);
  });

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

        <div className="search-wrap px-30 md:px-78">
          <Search
            value={walletAddr}
            onChange={(newVal: string) => {
              setWalletAddr(newVal);
            }}
            onSearch={() => {
              setPageInfo({ ...pageInfo, pageNum: 1, pageSize: 10 });
              refetchWhiteList();
            }}
            onRuleClick={() => {
              appStore.lenis?.destroy?.();
              open();
            }}
          />
        </div>
      </Banner>

      <div className="w-full overflow-auto">
        <Table whiteList={whiteList} pageNumber={pageInfo.pageNum} />
      </div>

      {!!whiteList.length && (
        <div className="flex-center">
          <Pagination
            onChange={(pageNumber: number, pageSize: number) => {
              setPageInfo({ ...pageInfo, pageNum: pageNumber, pageSize });
              refetchWhiteList();
            }}
            total={pageInfo.total}
          />
        </div>
      )}
    </ActivityWraap>
  );
};

export default Activity;
