'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import { FC, useEffect } from 'react';
import BackBtn from '@cps/Buttons/BackBtn';
import { $fontSize, $width, phoneSize } from '@/styled/mediaSize';
import { useGetBlog } from '@/service/useArticle';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

interface BlogDetailProps {
  params: { blogId: string };
}

const BlogDetail = styled.div`
  ${$width('100%', '1200rem', '1200rem')}
  margin: 0 auto 500rem;
  padding-top: 133rem;

  .blog-detail-content {
    ${$fontSize('23rem', '16rem', '16rem')}
    color: #5c5c5cff;

    img {
      /* max-width: 100%; */
      height: 240rem;
      margin: 24rem auto;
    }
  }

  .blog-recommend {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-content: center;
    place-items: center;
    gap: 32rem;
    margin-top: 64rem;

    @media (max-width: ${phoneSize}) {
      grid-template-columns: repeat(1, auto);
      padding: 0 38rem;
      gap: 62rem;
    }
  }

  .face-wrap {
    width: 100%;
    height: 394rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Blog: FC<BlogDetailProps> = ({ params }) => {
  const { getBlog, loading, blog } = useGetBlog();

  useEffect(() => {
    if (!params.blogId) {
      return;
    }
    getBlog(params.blogId);
  }, [params.blogId]);

  return (
    <BlogDetail>
      {/* <div>{params.blogId}</div> */}
      <main className="px-38 px-0">
        <BackBtn />
        <div className="face-wrap">
          <Image
            src={blog.cover}
            width={300}
            height={300}
            alt=""
            className="h-394 mx-auto mt-33 mb-54"
          />
        </div>

        <section className="mt-57 flex items-center">
          <div className="text-23 md:text-16 mr-32">{blog.createTime}</div>
          <div className="h-36 px-28 rounded-[31rem] bg-[#191919] flex-center text-19 md:text-16">
            {blog.categoryName}
          </div>
        </section>

        <div className="mt-32 mb-24 font-bold text-31 md:text-24">{blog.title}</div>

        <div className="blog-detail-content">
          <ReactMarkdown
            remarkPlugins={[remarkBreaks, remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            children={blog.content
              .replace(/hljs-center\s*(.*?)\s*\n:::/g, '<center>$1</center>')
              .replace(/:::/g, '&nbsp;')
              .replace(/\n\n/gi, '\n&nbsp;\n')
              .replace(/\+\+(.*?)\+\+/g, '<u>$1</u>')}
          />
        </div>
      </main>

      {/* <section className="mt-129">
        <div className="text-31 md:text-24 px-38 md:px-0">Recommended Reading</div>
        <div className="blog-recommend">
          <BlogItem className="w-full md:w-551"></BlogItem>
          <BlogItem className="w-full md:w-551"></BlogItem>
          <BlogItem className="w-full md:w-551"></BlogItem>
          <BlogItem className="w-full md:w-551"></BlogItem>
        </div>
      </section> */}
    </BlogDetail>
  );
};

export default Blog;
