import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import Image from 'next/image';

const AboutDownload = styled.div`
  margin-top: 346rem;
  position: relative;
  height: 100vh;

  .face {
    position: absolute;
    width: 1200rem;
    height: 676rem;

    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .about-download-main {
    width: 445rem;
    margin: auto;
    /* background-color: pink; */
    height: 676rem;
    position: relative;
    z-index: 9;

    ${flexPos('center')}
    flex-direction: column;
    text-align: center;
  }

  .btn {
    border: solid 1px #fff;
    border-radius: 6rem;
    padding: 0 38rem;
    height: 49rem;
    cursor: pointer;
  }
`;

const Blog = () => {
  return (
    <AboutDownload>
      <Image src={require('@img/home/temp-about-download.png')} alt="" className="face" />

      <main className="about-download-main">
        <div className="text-24 mb-24 font-bold">
          Multiple - The best solution for data storage and data transmission
        </div>
        <div className="text-16">
          Ensure data privacy All data is encrypted during storage and transmission
        </div>

        <div className='flex-center mt-69'>
          <button className='btn'>Download</button>
          <button className='btn ml-31'>Get Started</button>
        </div>
      </main>
    </AboutDownload>
  );
};

export default Blog;
