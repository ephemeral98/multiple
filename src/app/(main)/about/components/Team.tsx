import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';
import { FC, ReactNode } from 'react';

const MemberWrap = styled.div`
  ${flexPos('center')}
  flex-direction: column;
  text-align: center;
  width: 403rem;
`;

const Member: FC<{
  avatar: string;
  title: string;
  children?: ReactNode;
  className?: string;
}> = ({ avatar, children, title, className }) => {
  return (
    <MemberWrap className={className}>
      <Image priority className="w-221 rounded-10" src={avatar} alt="" />
      <div className="mt-16">{title}</div>
      {children}
    </MemberWrap>
  );
};

const TeamWrap = styled.div`
  ${flexPos('center', 'flex-start')}
  padding-bottom: 184rem;
`;

const Team = () => {
  return (
    <TeamWrap>
      <Member avatar={require('@img/about/avatar-james.png')} title={'Co-Founder - James Radford'}>
        <div className="flex-center my-24">
          <Image
            priority
            className="w-30 rounded-10"
            src={require('@img/about/icon-in.svg')}
            alt=""
          />
          <Image
            priority
            className="w-30 rounded-10 ml-16"
            src={require('@img/about/icon-x.svg')}
            alt=""
          />
        </div>
        <div className="text-16">
          Previous roles include Product Manager at BlockPulse and ex-CEO of DeChat, a Web3 SocialFi
          project, with 10 years of crypto experience. Graduate of The University of British
          Columbia.
        </div>
      </Member>
      <Member
        className="ml-234"
        avatar={require('@img/about/avatar-efrain.png')}
        title={'Tech Lead - Efrain Aldaz'}
      >
        <div className="flex-center my-24">
          <Image
            priority
            className="w-30 rounded-10"
            src={require('@img/about/icon-in.svg')}
            alt=""
          />
          <Image
            priority
            className="w-30 rounded-10 ml-16"
            src={require('@img/about/icon-x.svg')}
            alt=""
          />
        </div>
        <div>
          Previous roles include International Marketing Manager at GreenValley International and
          Senior Assistant Director at TAL Education Group. Graduate of San Diego State University.
        </div>
      </Member>
    </TeamWrap>
  );
};

export default Team;
