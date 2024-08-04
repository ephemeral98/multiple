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

  const fetchWhiteList = async () => {
    const resp = await $GET('/api/whiteUser/page', {
      pageNum: pageInfo.pageNum,
      pageSize: pageInfo.pageSize,
      // walletAddr: '',
    });

    console.log('白名单...', resp);

    const temp = [
      {
        batchNo: '3', // 阶段批次
        createTime: '2024-02-01 11:12',
        id: 1,
        isDelete: 0,
        score: '',
        seqNo: '01', // 序号
        snapshotTime: '2024-02-01 11:12', // 快照时间
        updateTime: '2024-02-01 11:12',
        walletAddr: '0x12301829038091231902803', // 钱包地址
      },
      {
        batchNo: '3', // 阶段批次
        createTime: '2024-02-01 11:12',
        id: 2,
        isDelete: 0,
        score: '',
        seqNo: '01', // 序号
        snapshotTime: '2024-02-01 11:12', // 快照时间
        updateTime: '2024-02-01 11:12',
        walletAddr: '0x12301829038091231902803', // 钱包地址
      },
    ];

    setWhiteList(temp);
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
