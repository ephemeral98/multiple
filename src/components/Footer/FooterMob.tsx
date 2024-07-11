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

const FooterMob = () => {
  const router = useRouter();
  const { PrivacyPolicy, TeamCondition, launchTo } = useLaunchTo();

  return (
    <FooterWrap className="app-footer flex-center flex-col relative">
      <section className="w-full">
        <div className="flex items-center justify-between flex-col">
          <div className="flex-center flex-col">
            <div
              className="cursor-pointer text-27"
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
              className="cursor-pointer text-27 mt-62"
            >
              About Us
            </div>
            <GetStartBtn className={'px-24! py-16! rounded-[4rem]!'} />
          </div>

          <Community className="mt-62 px" />
        </div>

        <div className="text-center mt-227 text-23">
          Copyright © 2024. By Multiple All rights reserved.
        </div>
        <div className="flex-center border-top-white mt-31 py-31 text-23">
          <div onClick={() => launchTo(PrivacyPolicy.current)} className="cursor-pointer text-23">
            Privacy Policy
          </div>
          <div
            onClick={() => launchTo(TeamCondition.current)}
            className="ml-115 cursor-pointer text-23"
          >
            Terms and Conditions
          </div>
        </div>
      </section>
    </FooterWrap>
  );
};

export default FooterMob;
