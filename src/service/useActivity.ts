import { useState } from 'react';
import { $GET } from './request';

export interface IWhite {
  batchNo: string; // 阶段批次
  createTime: string;
  id: number;
  isDelete: number;
  score: string;
  seqNo: string; // 序号
  snapshotTime: string; // 快照时间
  updateTime: string;
  walletAddr: string; // 钱包地址
}

/**
 * 获取白名单
 */
export const useWhiteList = () => {
  const [pageInfo, setPageInfo] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  });

  const [walletAddr, setWalletAddr] = useState('');

  const [loading, setLoading] = useState(false);

  const [whiteList, setWhiteList] = useState<IWhite[]>([]);

  /**
   * 请求白名单
   * @param addr
   */
  const fetchWhiteList = async (addr: string = '') => {
    const resp = await $GET<{ total: number; whiteUserList: IWhite[] }>('/api/whiteUser/page', {
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize,
      walletAddr: addr,
    });

    console.log('白名单...', resp);

    setPageInfo({
      ...pageInfo,
      total: resp.data?.total!,
    });

    setWhiteList(resp.data!.whiteUserList);
  };

  return {
    pageInfo,
    walletAddr,
    loading,
    whiteList,
    setPageInfo,
    setWhiteList,
    setWalletAddr,
    fetchWhiteList,
  };
};
