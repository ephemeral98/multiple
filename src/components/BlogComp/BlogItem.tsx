import { styled } from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { $height, $width, phoneSize } from '@/styled/mediaSize';

interface IProps {
  id: string;
  face: string;
  title: string;
  content: string;
  date: string;
  type: string;
  className?: string;
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

    ${$width('332rem', '487rem', '487rem')}
    ${$height('332rem', '272rem', '272rem')}

    .face-content {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10rem;
    }
  }
`;

const BlogItem = (props: IProps) => {
  const router = useRouter();
  return (
    <BlogItemWrap
      className={props.className}
      onClick={() => {
        router.push(`/blog/${props.id}`);
      }}
    >
      <div className="face-wrap">
        <Image src={props.face} width={300} height={300} alt="" className="face-content" />
      </div>

      <div className="my-29 md:my-24 text-31 md:text-24 font-bold">{props?.title}</div>
      <main className="text-#585858 text-23 md:text-16">{props?.content}</main>

      <footer className="mt-57 flex justify-between items-center">
        <div className="text-23 md:text-16">{props?.date}</div>
        <div className="h-44 md:h-36 px-28 rounded-[31rem] bg-[#191919] flex-center text-23 md:text-16">
          {props?.type}
        </div>
      </footer>
    </BlogItemWrap>
  );
};

export default BlogItem;
