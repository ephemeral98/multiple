import Image from 'next/image';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';
import Community, { GetStartBtn } from '../Community';
import { useLaunchTo } from '@/hooks/useLaunchTo';
import { flexPos } from '@/styled/mixin';
import Button from '../Buttons';
import { useTopBar } from '../TopBar/useTopBar';

const FooterWrap = styled.footer`
  ${flexPos('center')}
  /* background-color: #008c8c; */

  .footer-main {
    ${flexPos('space-between')}
    width: 1200rem;
    height: 139rem;
    border: solid 1px #fff;
    margin: 0 auto;
    border-radius: 10rem;
  }
`;

const Footer = () => {
  const router = useRouter();
  const { PrivacyPolicy, TeamCondition, launchTo } = useLaunchTo();
  const { navList, setNavList } = useTopBar();

  return (
    <FooterWrap className="app-footer relative">
      <section className="w-full ">
        <div className="footer-main px-45">
          <div className="flex-center">
            <Button onClick={() => router.push('/product')}>Download</Button>
            <Button className={'ml-31'}>Get Started</Button>
          </div>

          <div className="flex-center">
            <div className="flex-center mr-59">
              {navList.map((item, inx) => {
                return (
                  <a
                    key={item.text}
                    className={`cursor-pointer text-#fff ${inx > 0 ? 'ml-48' : ''} `}
                    onClick={() => {
                      if (item.link) {
                        window.open(item.link);
                        return;
                      }
                      router.push(item.path);
                    }}
                  >
                    {item.text}
                  </a>
                );
              })}
            </div>
            <Community size={51} gap={24} />
          </div>
        </div>

        <div className="w-1200 py-24 mx-auto flex justify-between items-center">
          <div className="text-#585858FF!">Copyright © 2024. By Multiple All rights reserved.</div>
          <div className="flex-center">
            <div
              onClick={() => launchTo(PrivacyPolicy.current)}
              className="cursor-pointer text-#585858FF!"
            >
              Privacy Policy
            </div>
            <div
              onClick={() => launchTo(TeamCondition.current)}
              className="ml-43 cursor-pointer text-#585858FF!"
            >
              Terms and Conditions
            </div>
          </div>
        </div>
      </section>
    </FooterWrap>
  );
};

export default Footer;
