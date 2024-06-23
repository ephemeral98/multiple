import Image from 'next/image';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

const FooterWrap = styled.footer`
  .border-top-white {
    border-top: solid 1px #fff;
  }

  .start-btn {
    padding: 16rem 24rem;
    border-radius: 4rem;
    border: solid 1px #fff;
    color: #fff;
  }
`;

const Footer = () => {
  const router = useRouter();

  return (
    <FooterWrap className="app-footer flex-center relative">
      <section className="absolute bottom-0 z-11 w-full">
        <div className="flex items-center justify-between px-260">
          <div className="flex-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push('/product');
              }}
            >
              Product
            </div>
            <div
              onClick={() => {
                router.push('/about');
              }}
              className="ml-59 cursor-pointer"
            >
              About Us
            </div>
            <button className="start-btn ml-59">GetStarted</button>
          </div>

          <div className="flex-center">
            <Image
              className="w-51 h-51 cursor-pointer"
              src={require('@img/common/icon-discord.png')}
              alt=""
            />
            <Image
              className="w-51 h-51 ml-24 cursor-pointer"
              src={require('@img/common/icon-x.png')}
              alt=""
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-top-white mt-38 py-24 px-260">
          <div>Copyright © 2024. By Multiple All rights reserved.</div>
          <div className="flex-center">
            <div className="cursor-pointer">Privacy Policy</div>
            <div className="ml-43 cursor-pointer">Terms and Conditions</div>
          </div>
        </div>
      </section>
    </FooterWrap>
  );
};

export default Footer;
