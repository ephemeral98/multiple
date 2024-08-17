import { styled } from 'styled-components';
import Image from 'next/image';
import { CSSProperties } from 'react';
import { flexPos } from '@/styled/mixin';
import { Message } from '@arco-design/web-react';
import { useLaunchToApp } from '@/hooks/useLaunchTo';

interface IProps {
  size?: number;
  gap?: number;
  style?: CSSProperties;
  className?: string;
}

/**
 * 社区
 */
const CommunityWrap = styled.div<{ $wh: number; $gap: number }>`
  ${flexPos('center')}

  .icon-community {
    width: ${(props) => props.$wh}rem;
    height: ${(props) => props.$wh}rem;

    &:not(:first-child) {
      margin-left: ${(props) => props.$gap}rem;
    }
  }
`;

const Community = (props: IProps) => {
  return (
    <CommunityWrap
      $gap={props.gap || 35}
      $wh={props.size || 75}
      className={props.className}
      style={props.style}
    >
      <Image
        priority
        className="icon-community cursor-pointer"
        src={require('@img/common/icon-discord.png')}
        alt=""
        onClick={() => window.open('https://discord.gg/nzu4qrm9y7')}
      />
      <Image
        priority
        className="icon-community cursor-pointer"
        src={require('@img/common/icon-x.png')}
        alt=""
        onClick={() => window.open('https://x.com/MTP_Network')}
      />
      <Image
        priority
        className="icon-community cursor-pointer"
        src={require('@img/common/icon-m.png')}
        alt=""
        onClick={() => window.open('https://medium.com/@Multiple_Network')}
      />
      <Image
        priority
        className="icon-community cursor-pointer"
        src={require('@img/common/icon-tg.png')}
        alt=""
        onClick={() => window.open('https://t.me/MultipleOfficialGroup')}
      />
    </CommunityWrap>
  );
};

export default Community;

interface IPropsStartBtn {
  style?: CSSProperties;
  className?: string;
}
/**
 * 开始按钮
 */
const StartBtnWrap = styled.button`
  padding: 37rem 146rem;
  border-radius: 19rem;
  border: solid 1px #fff;
  color: #fff;
  font-size: 27rem;
  margin-top: 62rem;
`;
export const GetStartBtn = (props: IPropsStartBtn) => {
  const { appLink, launchTo } = useLaunchToApp();

  return (
    <StartBtnWrap
      style={props.style}
      className={props.className}
      onClick={() => {
        launchTo(appLink.current);
      }}
    >
      Get Started
    </StartBtnWrap>
  );
};
