import { styled } from 'styled-components';
import Image from 'next/image';

interface IProps {
  face: string;
  title: string;
  content: string;
  date: string;
  type: string;
}

const BlogItemWrap = styled.div`
  padding: 30rem;
  border: solid 1px #585858;
  border-radius: 10rem;

  .face-wrap {
    height: 272rem;

    .face-content {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10rem;
    }
  }
`;

const BlogItem = (props: any) => {
  return (
    <BlogItemWrap className={props.className}>
      <div className="face-wrap">
        <Image src={require('@img/common/banner-about.png')} alt="" className="face-content" />
      </div>

      <div className="my-24 text-24 font-bold">Lorem ipsum dolor sit.</div>
      <main className="text-#585858 text-16">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, veritatis!
      </main>

      <footer className="mt-57 flex justify-between items-center">
        <div className="text-16">Jul 18.2024</div>
        <div className="h-36 px-28 rounded-[31rem] bg-[#191919] flex-center">News</div>
      </footer>
    </BlogItemWrap>
  );
};

export default BlogItem;
