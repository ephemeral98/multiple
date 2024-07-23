import { styled } from 'styled-components';
import Image from 'next/image';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

const BackBtnWrap = styled.a`
  display: flex;
  align-items: center;
  font-size: 16rem;
  color: #fff;
  user-select: none;

  .icon-back {
    width: 14rem;
    transform: rotate(180deg);
    margin-right: 8rem;
  }
`;

const BackBtn: FC<{
  onClick?: () => void;
  className?: string;
}> = (props) => {
  const router = useRouter();

  return (
    <BackBtnWrap
      className={props.className}
      onClick={() => {
        if (props.onClick) {
          props.onClick();
          return;
        }
        router.back();
      }}
    >
      <Image src={require('@img/home/icon-arrow.svg')} alt="" className="icon-back" />
      <span>Back</span>
    </BackBtnWrap>
  );
};

export default BackBtn;
