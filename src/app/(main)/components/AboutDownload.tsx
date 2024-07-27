import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import Image from 'next/image';
import { $fontSize, $height, $width } from '@/styled/mediaSize';
import Sticky from '@cps/Lax/Sticky';
import VideoBox from '@/components/VideoBox';
import { useVideoPlay } from '../hooks/useVideoPlay';
import { useRouter } from 'next/navigation';

const AboutDownload = styled.div`
  margin-top: 346rem;
  position: sticky;
  top: 0;
  height: 100vh;
  margin-bottom: 500rem;

  .face {
    position: absolute;
    /* ${$width('100%', '1200rem', '1200rem')} */
    width: 100%;
    /* ${$height('676rem', '676rem', '676rem')} */

    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .about-download-main {
    ${$width('608rem', '445rem', '445rem')}

    margin: auto;
    /* background-color: pink; */
    /* ${$height('676rem', '676rem', '676rem')} */
    height: 100vh;
    position: relative;
    z-index: 9;

    ${flexPos('center')}
    flex-direction: column;
    text-align: center;
  }

  .btn {
    border: solid 1px #fff;
    border-radius: 6rem;
    /* padding: 0 38rem; */
    ${$height('94rem', '49rem', '49rem')}
    ${$fontSize('27rem', '14rem', '14rem')}
    ${$width('269rem', '140rem', '140rem')}
    cursor: pointer;
  }
`;

const Blog = () => {
  const { targetRef: targetRef1, videoRef: videoRef4 } = useVideoPlay();
  const router = useRouter();

  return (
    <AboutDownload className="lax-bigger" data-lax-anchor="self">
      {/* <Image src={require('@img/home/temp-about-download.png')} alt="" className="face" /> */}
      <VideoBox className="two face" src="/video/video-4.mp4" ref={videoRef4}></VideoBox>

      <main className="about-download-main">
        <div className="text-31 md:text-24 mb-24 font-bold">
          Multiple - The best solution for data storage and data transmission
        </div>
        <div className="text-23 md:text-16">
          Ensure data privacy All data is encrypted during storage and transmission
        </div>

        <div className="flex-center flex-col md:flex-row mt-69 text-23 md:text-16s">
          <button className="btn" onClick={() => router.push('/product')}>
            Download
          </button>
          <button className="btn mt-46 md:mt-0 md:ml-31">Get Started</button>
        </div>
      </main>
    </AboutDownload>
  );
};

export default Blog;
