import { styled } from 'styled-components';
import Image from 'next/image';

const BannerWrap = styled.div`
  width: 1400rem;
  height: 100vh;
  padding: 156rem 0 56rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  > .banner-content {
    display: flex;
    line-height: 1;
    /* background-color: pink; */

    .banner-text {
      flex: auto;
      /* background-color: skyblue; */
      white-space: nowrap;
    }

    .banner-face {
      flex: 0 0 567rem;
      padding-top: 162rem;
    }
  }

  .icon-partner {
    display: grid;
    grid-template-columns: repeat(7, auto);
    place-content: center;
    place-items: center;
    grid-gap: 85rem;
    margin-top: 175rem;
  }
`;

const Banner = () => {
  return (
    <BannerWrap>
      <main className="banner-content">
        <div className="banner-text">
          <div className="text-64 text-up">
            <div>Monetise your</div>
            <div> internet connection.</div>
            <div> Join and earn.</div>
          </div>
          <div className="mt-33 text-20 leading-[1.4]">
            <div>Our AI-powered network layer revolutionises the way data is transmitted by</div>
            <div>allowing multiple simultaneous channels through your current bandwidth and</div>
            <div>intelligently selects the best private nodes for point to point navigation.</div>
          </div>
        </div>

        <div className="banner-face">
          <Image src={require('@img/common/home-logo.png')} alt="" className="w-full" />
        </div>
      </main>

      <div className="icon-partner">
        <Image src={require('@img/common/icon-okx.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-ngc.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-stratifiec.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-puzzle.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-bitrise.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-catchervc.png')} alt="" className="w-full" />
        <Image src={require('@img/common/icon-youbicapital.png')} alt="" className="w-full" />
      </div>
    </BannerWrap>
  );
};

export default Banner;
