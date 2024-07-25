import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { FC, ReactNode } from 'react';
import { $width, phoneSize } from '@/styled/mediaSize';

const MemberWrap = styled.div`
  ${flexPos('center')}
  flex-direction: column;
  text-align: center;
  ${$width('100%', '403rem', '403rem')}

  @media (max-width: ${phoneSize}) {
    ${flexPos('flex-start', 'flex-start')}
    text-align: left;
  }
`;

const Member: FC<{
  avatar: string;
  title: string;
  children?: ReactNode;
  className?: string;
}> = ({ avatar, children, title, className }) => {
  return (
    <MemberWrap className={className}>
      <Image priority className="w-317 md:w-221 rounded-10" src={avatar} alt="" />
      <div className="flex-center md:flex-col">
        <div className="mt-16 text-27 md:text-14 whitespace-nowrap">{title}</div>
        <div className="flex-center my-24 ml-38 md:ml-0">
          <Image
            priority
            className="w-60 md:w-30 rounded-10"
            src={require('@img/about/icon-in.svg')}
            alt=""
          />
          <Image
            priority
            className="w-60 md:w-30 rounded-10 ml-16"
            src={require('@img/about/icon-x.svg')}
            alt=""
          />
        </div>
      </div>
      {children}
    </MemberWrap>
  );
};

const TeamWrap = styled.div`
  padding: 260rem 207rem 265rem;
  margin: auto;
  @media (max-width: ${phoneSize}) {
    padding: 0 0 265rem 38rem !important;
  }

  .team-main {
    ${flexPos('center', 'flex-start')}

    @media (max-width: ${phoneSize}) {
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

const Team = () => {
  return (
    <TeamWrap>
      <div className="text-46 md:text-64 text-#fff font-bold mb-110 text-left">TEAM</div>

      <main className="team-main">
        <Member
          avatar={require('@img/about/avatar-james.png')}
          title={'Co-Founder - James Radford'}
        >
          <div className="text-23 md:text-16 pr-38 md:pr-0">
            Previous roles include Product Manager at BlockPulse and ex-CEO of DeChat, a Web3
            SocialFi project, with 10 years of crypto experience. Graduate of The University of
            British Columbia.
          </div>
        </Member>
        <Member
          className="md:ml-234 mt-96 md:mt-0"
          avatar={require('@img/about/avatar-efrain.png')}
          title={'Tech Lead - Efrain Aldaz'}
        >
          <div className="text-23 md:text-16 pr-38 md:pr-0">
            Previous roles include International Marketing Manager at GreenValley International and
            Senior Assistant Director at TAL Education Group. Graduate of San Diego State
            University.
          </div>
        </Member>
      </main>
    </TeamWrap>
  );
};

export default Team;
