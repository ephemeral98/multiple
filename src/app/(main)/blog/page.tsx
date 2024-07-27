'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import useAppStore from '@/store/appStore';
import { Banner } from '@cps/Banner';
import BlogItem from '@cps/BlogComp/BlogItem';
import { $height, $width, phoneSize } from '@/styled/mediaSize';
import { useGetArticleList } from '@/service/useArticle';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

const BlogWrap = styled.div`
  padding-bottom: 503rem;

  .blog-main {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-content: center;
    place-items: center;
    gap: 32rem;
    margin-top: 182rem;

    @media (max-width: ${phoneSize}) {
      grid-template-columns: repeat(1, auto);
      gap: 62rem;
      padding: 0 38rem;
    }

    > div {
      ${$width('100%', '551rem', '551rem')}

      @media (max-width: ${phoneSize}) {
        min-height: 680rem;
      }
      @media (min-width: ${phoneSize}) {
        height: 557rem;
      }
    }
  }
`;

const Blog = () => {
  const appStore = useAppStore();
  const { article, getArticle, loading } = useGetArticleList();
  useEffect(() => {
    getArticle();
  }, []);

  return (
    <BlogWrap>
      <Banner
        mobBanner={require('@img/blog/banner-blog.png')}
        pcBanner={require('@img/blog/banner-blog.png')}
        title="BLOG"
      ></Banner>

      <main className="blog-main">
        {article.map((item) => {
          return (
            <BlogItem
              face={item.cover}
              title={item.title}
              content={item.summary}
              date={item.createTime}
              type={item.categoryName}
              id={item.id}
              key={item.id}
            />
          );
        })}
      </main>
    </BlogWrap>
  );
};

export default Blog;
