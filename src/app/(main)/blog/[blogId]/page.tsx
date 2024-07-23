'use client';

import { styled } from 'styled-components';
import Image from 'next/image';
import useAppStore from '@/store/appStore';
import { FC } from 'react';
import BackBtn from '@cps/Buttons/BackBtn';
import BlogItem from '@cps/BlogComp/BlogItem';

interface BlogDetailProps {
  params: { blogId: string };
}

const BlogDetail = styled.div`
  width: 1200rem;
  margin: 0 auto 500rem;
  padding-top: 133rem;

  .blog-detail-content {
    font-size: 16rem;
    color: #5c5c5cff;
  }

  .blog-recommend {
    display: grid;
    grid-template-columns: repeat(2, auto);
    place-content: center;
    place-items: center;
    gap: 32rem;
    margin-top: 64rem;
  }
`;

const Blog: FC<BlogDetailProps> = ({ params }) => {
  const appStore = useAppStore();

  return (
    <BlogDetail>
      {/* <div>{params.blogId}</div> */}
      <BackBtn />
      <Image src={require('@img/common/temp-blog.png')} alt="" className="w-full mt-33 mb-54" />

      <section className="mt-57 flex items-center">
        <div className="text-16 mr-32">Jul 18.2024</div>
        <div className="h-36 px-28 rounded-[31rem] bg-[#191919] flex-center">News</div>
      </section>

      <div className="mt-32 mb-24 font-bold text-24">
        Decentralized AI: The Future of Scalable AI Applications
      </div>

      <div className="blog-detail-content">
        As a globally distributed modular computing network, the Lumoz network is committed to
        providing advanced zero-knowledge proof (ZKP) services, supporting the development of the
        Rollup network, and providing powerful computing power services for cutting-edge
        technologies such as artificial intelligence (AI). Facing the challenge of high computing
        costs in the current zero-knowledge computing field, the Lumoz network, with its many years
        of deep expertise in the ZKP field, has greatly improved computing efficiency through
        innovative optimization of circuits and algorithms, effectively solving the high cost and
        low efficiency problems faced by Rollup projects, and lowering the threshold for ordinary
        users to participate in the zero-knowledge computing market. The zkVerifier node will bring
        unprecedented convenience to users. Users only need to run lightweight nodes to easily
        participate in ZK computing and receive corresponding rewards from the network. This
        innovative initiative will promote the widespread application of zero-knowledge computing
        technology and bring broader application prospects to the entire industry.
      </div>

      <section className="mt-129">
        <div className='text-24'>Recommended Reading</div>
        <div className="blog-recommend">
          <BlogItem className="w-551"></BlogItem>
          <BlogItem className="w-551"></BlogItem>
          <BlogItem className="w-551"></BlogItem>
          <BlogItem className="w-551"></BlogItem>
        </div>
      </section>
    </BlogDetail>
  );
};

export default Blog;
