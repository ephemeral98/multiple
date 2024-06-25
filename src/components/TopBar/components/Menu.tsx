import { styled } from 'styled-components';
import Image from 'next/image';
import { INav, useTopBar } from '../useTopBar';
import { flexPos } from '@/styled/mixin';
import Community, { GetStartBtn } from '@/components/Community';

interface IProps {
  onClose: () => void;
  pickTab: (tab: INav) => void;
  toHome: () => void;
}

const MenuWrap = styled.div`
  position: fixed;
  left: 0;
  /* top: 115rem; */
  top: 0;
  width: 100%;
  /* height: calc(100vh - 115rem); */
  height: 100vh;
  background-color: #000;
  padding-top: 300rem;

  ${flexPos('center', 'flex-start')}
  text-align: center;

  .nav-item {
    font-size: 38rem;
    &:not(:first-child) {
      margin-top: 62rem;
    }
  }

  .icon-close {
    width: 42rem;
    cursor: pointer;
    position: absolute;
    left: 50%;
    bottom: 175rem;
  }
`;

const Menu = (props: IProps) => {
  const { navList } = useTopBar();

  return (
    <MenuWrap>
      <div>
        <div
          onClick={() => {
            props.toHome();
            props.onClose();
          }}
          className={`nav-item`}
        >
          Home
        </div>
        {navList.map((item) => (
          <div
            key={item.text}
            onClick={() => {
              props.pickTab(item);
              props.onClose();
            }}
            className={`nav-item ${item.active ? 'active' : ''}`}
          >
            {item.text}
          </div>
        ))}

        <GetStartBtn />

        <Community className="mt-62" size={75} gap={24} />
      </div>

      <Image
        onClick={() => {
          props.onClose();
        }}
        className="icon-close"
        src={require('@img/common/icon-close.svg')}
        alt=""
      />
    </MenuWrap>
  );
};

export default Menu;
