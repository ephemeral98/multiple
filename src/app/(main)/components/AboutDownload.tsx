import { styled } from 'styled-components';
import { flexPos } from '@/styled/mixin';
import Image from 'next/image';
import { $fontSize, $height, $paddingTop, $width } from '@/styled/mediaSize';
import Sticky from '@cps/Lax/Sticky';
import VideoBox from '@/components/VideoBox';
import { useVideoPlay } from '../hooks/useVideoPlay';
import { useRouter } from 'next/navigation';
import Button from '@/components/Buttons';
import { useLaunchToApp } from '@/hooks/useLaunchTo';

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
    /* ${$height('100vh', '676rem', '676rem')} */
    height: 100vh;

    object-fit: cover;

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
    /* ${$paddingTop('325rem', '258rem', '258rem')} */
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
  // const { targetRef: targetRef1, videoRef: videoRef4 } = useVideoPlay();
  const router = useRouter();
  const { appLink, launchTo } = useLaunchToApp();

  return (
    <AboutDownload className="lax-bigger" data-lax-anchor="self">
      <Image
        unoptimized
        src={require('@img/home/temp-about-download.png')}
        alt=""
        className="face"
      />
      {/* <VideoBox className="two face" src="/video/video-4.mp4" ref={videoRef4}></VideoBox> */}

      <main className="about-download-main">
        <div className="text-31 md:text-24 mb-24 font-bold">
          <span className="text-#2865FF">Multiple Network</span> is a Web3 Privacy Acceleration
          solution for <span className="text-#2865FF">AI</span>
        </div>
        <div className="text-23 md:text-16">
          Provides privacy protection and data acceleration services based on{' '}
          <span className="text-#2865FF">P2P</span> and{' '}
          <span className="text-#2865FF">SD-WAN </span>
          technologies. 
        </div>

        <div className="flex-center flex-col md:flex-row mt-69 text-23 md:text-16">
          <Button className="btn" onClick={() => router.push('/product')}>
            Download
          </Button>
          <Button className="btn mt-46 md:mt-0 md:ml-31" onClick={() => launchTo(appLink.current)}>
            Get Started
          </Button>
        </div>
      </main>
    </AboutDownload>
  );
};

export default Blog;
