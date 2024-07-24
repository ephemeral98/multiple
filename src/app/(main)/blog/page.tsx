'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import useAppStore from '@/store/appStore';
import { Banner } from '@cps/Banner';
import BlogItem from '@cps/BlogComp/BlogItem';
import { phoneSize } from '@/styled/mediaSize';

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
  }
`;

const Blog = () => {
  const appStore = useAppStore();

  return (
    <BlogWrap>
      <Banner
        mobBanner={require('@img/blog/banner-blog.png')}
        pcBanner={require('@img/blog/banner-blog.png')}
        title="BLOG"
      ></Banner>

      <main className="blog-main">
        <BlogItem className="w-full md:w-551"></BlogItem>
        <BlogItem className="w-full md:w-551"></BlogItem>
        <BlogItem className="w-full md:w-551"></BlogItem>
        <BlogItem className="w-full md:w-551"></BlogItem>
      </main>
    </BlogWrap>
  );
};

export default Blog;
