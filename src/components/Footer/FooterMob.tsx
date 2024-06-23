import Image from 'next/image';
import { styled } from 'styled-components';

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
  return (
    <FooterWrap className="app-footer flex-center flex-col relative">
      <section className="absolute bottom-0 z-11 w-full">
        <div className="flex items-center justify-between flex-col">
          <div className="flex-center flex-col">
            <div className="cursor-pointer text-27">Product</div>
            <div className="cursor-pointer text-27 mt-62">About Us</div>
            <button className="start-btn mt-62 text-27">GetStarted</button>
          </div>

          <div className="flex-center mt-196">
            <Image
              className="w-75 h-75 cursor-pointer"
              src={require('@img/common/icon-discord.png')}
              alt=""
            />
            <Image
              className="w-75 h-75 ml-35 cursor-pointer"
              src={require('@img/common/icon-x.png')}
              alt=""
            />
          </div>
        </div>

        <div className="text-center mt-227 text-23">
          Copyright © 2024. By Multiple All rights reserved.
        </div>
        <div className="flex-center border-top-white mt-31 py-31 text-23">
          <div className="cursor-pointer text-23">Privacy Policy</div>
          <div className="ml-115 cursor-pointer text-23">Terms and Conditions</div>
        </div>
      </section>
    </FooterWrap>
  );
};

export default Footer;
