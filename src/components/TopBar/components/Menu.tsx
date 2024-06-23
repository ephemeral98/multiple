import { styled } from 'styled-components';
import Image from 'next/image';
import { INav, useTopBar } from '../useTopBar';
import { flexPos } from '@/styled/mixin';

interface IProps {
  onClose: () => void;
  pickTab: (tab: INav) => void;
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

  .start-btn {
    padding: 37rem 146rem;
    border-radius: 19rem;
    border: solid 1px #fff;
    color: #fff;
    font-size: 27rem;
    margin-top: 62rem;
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

        <button className="start-btn">GetStarted</button>

        <div className="flex-center mt-62">
          <Image
            className="w-75 h-75 cursor-pointer"
            src={require('@img/common/icon-discord.png')}
            alt=""
          />
          <Image
            className="w-75 h-75 ml-24 cursor-pointer"
            src={require('@img/common/icon-x.png')}
            alt=""
          />
        </div>
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
