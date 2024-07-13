import Image from 'next/image';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import Community, { GetStartBtn } from '../Community';
import { useLaunchTo } from '@/hooks/useLaunchTo';

const FooterWrap = styled.footer`
  .border-top-white {
    border-top: solid 1px #fff;
  }
`;

const Footer = () => {
  const router = useRouter();
  const { PrivacyPolicy, TeamCondition, launchTo } = useLaunchTo();

  return (
    <FooterWrap className="app-footer flex-center relative">
      <section className="w-full">
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
            <GetStartBtn className={'px-24! py-16! rounded-[4rem]! text-14! mt-0! ml-59!'} />
          </div>

          <Community size={51} gap={24} />
        </div>

        <div className="flex items-center justify-between border-top-white mt-38 py-24 px-260">
          <div>Copyright © 2024. By Multiple All rights reserved.</div>
          <div className="flex-center">
            <div onClick={() => launchTo(PrivacyPolicy.current)} className="cursor-pointer">
              Privacy Policy
            </div>
            <div onClick={() => launchTo(TeamCondition.current)} className="ml-43 cursor-pointer">
              Terms and Conditions
            </div>
          </div>
        </div>
      </section>
    </FooterWrap>
  );
};

export default Footer;
