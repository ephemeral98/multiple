import { sleep } from '@/utils';
import useSWRMutation from 'swr/mutation';
import { Message } from '@arco-design/web-react';
import { $GET } from './request';
import { useState } from 'react';
import { useUpdateRef } from '@/hooks';
import { IBlog } from './type';

/**
 * 分页查询文章
 */
export const useGetArticleList = () => {
  const { data, trigger, isMutating } = useSWRMutation('/article/articleList', async () => {
    const resp = await $GET<{ rows: any[] }>('/api/article/articleList', {
      categoryId: '',
      pageNum: 1,
      pageSize: 20,
    });
    console.log('resppppp', resp);
    if (resp.success) {
      return resp.data?.rows || [];
    }

    return [];
  });

  return {
    getArticle: trigger,
    loading: isMutating,
    article: data || [],
  };
};

/**
 * 查询单个文章
 */
export const useGetBlog = () => {
  const [loading, forceUpdateLoad] = useUpdateRef(false);
  const [blogInfo, setBlogInfo] = useState<IBlog>({
    categoryId: '',
    categoryName: '',
    content: '',
    cover: '',
    createTime: '',
    id: '',
    nickName: '',
    sort: 0,
    summary: '',
    title: '',
    viewCount: 0,
  });
  const fetchBlog = async (id: string) => {
    loading.current = true;
    const resp = await $GET<IBlog>(`/api/article/${id}`).finally(() => {
      loading.current = false;
    });
    if (resp.success) {
      setBlogInfo(resp.data!);
      return resp.data || {};
    }
  };

  return {
    getBlog: fetchBlog,
    loading: loading,
    blog: blogInfo || [],
  };
};
