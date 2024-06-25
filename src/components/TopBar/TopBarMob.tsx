import { styled } from 'styled-components';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useTopBar } from './useTopBar';
import { flexPos } from '@/styled/mixin';
import { useModal } from '@/hooks/useModal';
import Menu from './components/Menu';

const TopBarMobWrap = styled.header`
  position: absolute;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 100000;
  backdrop-filter: blur(3px);

  height: 115rem;
  padding: 0 20rem;
  ${flexPos('space-between')}
`;

const TopBarMob = () => {
  const { navList } = useTopBar();
  const { toggle, isOpen, close } = useModal(Menu, {
    animate: {
      enterActive: 'animate__animated animate__fadeInRight',
      exitActive: 'animate__animated animate__fadeOutRight',
    },
    props: {
      pickTab(tab) {
        router.push(tab.path);
      },
      toHome() {
        router.push('/');
      },
    },
  });

  const router = useRouter();
  return (
    <TopBarMobWrap>
      <Image
        className="w-262 cursor-pointer"
        src={require('@img/common/icon-logo.png')}
        alt=""
        onClick={() => {
          router.push('/');
          if (isOpen) {
            close();
          }
        }}
      />

      <Image
        className="w-54 cursor-pointer"
        src={require('@img/common/icon-menu.png')}
        alt=""
        onClick={() => toggle({ show: !isOpen })}
      />
    </TopBarMobWrap>
  );
};

export default TopBarMob;
