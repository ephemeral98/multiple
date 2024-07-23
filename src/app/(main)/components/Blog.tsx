import { styled } from 'styled-components';
import BlogItem from '@cps/BlogComp/BlogItem';
import { flexPos } from '@/styled/mixin';
import TitleWrap from '@cps/Title';

const BlogWrap = styled.div`
  margin-top: 296rem;

  .blog-content {
    ${flexPos('center')}
  }
`;

const Blog = () => {
  return (
    <BlogWrap>
      <TitleWrap className="mb-80">Explore our blog</TitleWrap>

      <main className="blog-content">
        <BlogItem className="w-551"></BlogItem>
        <BlogItem className="w-551 ml-32"></BlogItem>
      </main>

      <div className="flex-center mt-72">
        <button className="text-24">See more</button>
      </div>
    </BlogWrap>
  );
};

export default Blog;
