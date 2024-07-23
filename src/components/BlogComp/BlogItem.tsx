import { styled } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { $height, phoneSize } from '@/styled/mediaSize';

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
  cursor: pointer;

  @media (max-width: ${phoneSize}) {
      padding: 38rem;
  }

  .face-wrap {
    ${$height('332rem', '272rem', '272rem')}

    .face-content {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10rem;
    }
  }
`;

const BlogItem = (props: any) => {
  const router = useRouter();
  return (
    <BlogItemWrap
      className={props.className}
      onClick={() => {
        router.push('/blog/1');
      }}
    >
      <div className="face-wrap">
        <Image src={require('@img/common/temp-blog.png')} alt="" className="face-content" />
      </div>

      <div className="my-29 md:my-24 text-31 md:text-24 font-bold">
        Decentralized AI: The Future of Scalable AI Applications
      </div>
      <main className="text-#585858 text-23 md:text-16">
        De-WAN integrates advanced Web 3.0 technologies inclusive of blockchain, SD-WAN, P2P, and
        encryption.
      </main>

      <footer className="mt-57 flex justify-between items-center">
        <div className="text-23 md:text-16">Jul 18.2024</div>
        <div className="h-44 md:h-36 px-28 rounded-[31rem] bg-[#191919] flex-center text-23 md:text-16">
          News
        </div>
      </footer>
    </BlogItemWrap>
  );
};

export default BlogItem;
