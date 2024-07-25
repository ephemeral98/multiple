import { styled } from 'styled-components';
import BlogItem from '@cps/BlogComp/BlogItem';
import { flexPos } from '@/styled/mixin';
import TitleWrap from '@cps/Title';
import { $width, phoneSize } from '@/styled/mediaSize';
import { useRouter } from 'next/navigation';
import { useGetArticleList } from '@/service/useArticle';
import { useEffect } from 'react';

const BlogWrap = styled.div`
  margin-top: 296rem;

  .blog-content {
    ${flexPos('center')}

    @media (max-width: ${phoneSize}) {
      flex-direction: column;
    }

    > div {
      width: 673rem;
      ${$width('673rem', '551rem', '551rem')}

      &:not(:first-child) {
        margin-left: 32rem;
        @media (max-width: ${phoneSize}) {
          margin-left: 0;
          margin-top: 62rem;
        }
      }
    }
  }
`;

const Blog = () => {
  const router = useRouter();
  const { article, getArticle, loading } = useGetArticleList();
  useEffect(() => {
    getArticle();
  }, []);
  return (
    <BlogWrap>
      <TitleWrap className="mb-80">Explore our blog</TitleWrap>

      <main className="blog-content">
        {article
          .filter((item, inx) => inx < 2)
          .map((item) => {
            return (
              <BlogItem
                className="w-673 md:w-551"
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

      <div className="flex-center mt-72">
        <button
          className="text-32 md:text-24"
          onClick={() => {
            router.push('/blog');
          }}
        >
          See more
        </button>
      </div>
    </BlogWrap>
  );
};

export default Blog;
