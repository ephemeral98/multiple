import { styled } from 'styled-components';
import { FC, ReactNode, useEffect, useRef } from 'react';

const DanceButtonWrap = styled.button`
  --background: #2865ff;
  --text: #fff;
  --font-size: 16px;
  --duration: 0.44s;
  --move-hover: -4px;
  --shadow: 0 2px 8px -1px rgba(39, 94, 254, 0.32);
  --shadow-hover: 0 4px 20px -2px rgba(39, 94, 254, 0.5);
  --font-shadow: var(--font-size);
  /* padding: 16px 32px; */
  font-family: 'Roboto';
  font-weight: 500;
  line-height: var(--font-size);
  border-radius: 24px;
  display: block;
  outline: none;
  appearance: none;
  border: none;
  text-decoration: none;
  font-size: var(--font-size);
  letter-spacing: 0.5px;
  background: var(--background);
  color: var(--text);
  box-shadow: var(--shadow);
  transform: translateY(var(--y)) translateZ(0);
  transition: transform var(--duration) ease, box-shadow var(--duration) ease;

  &:hover {
    --y: var(--move-hover);
    --shadow: var(--shadow-hover);

    span {
      --m: calc(var(--font-size) * -1);
    }
  }

  div {
    display: flex;
    overflow: hidden;
    text-shadow: 0 var(--font-shadow) 0 var(--text);
  }

  div span {
    display: block;
    backface-visibility: hidden;
    font-style: normal;
    transition: transform var(--duration) ease;
    transform: translateY(var(--m)) translateZ(0);
  }

  div span:nth-child(1) {
    transition-delay: 0.05s;
  }

  div span:nth-child(2) {
    transition-delay: 0.1s;
  }

  div span:nth-child(3) {
    transition-delay: 0.15s;
  }

  div span:nth-child(4) {
    transition-delay: 0.2s;
  }

  div span:nth-child(5) {
    transition-delay: 0.25s;
  }

  div span:nth-child(6) {
    transition-delay: 0.3s;
  }

  div span:nth-child(7) {
    transition-delay: 0.35s;
  }

  div span:nth-child(8) {
    transition-delay: 0.4s;
  }

  div span:nth-child(9) {
    transition-delay: 0.45s;
  }

  div span:nth-child(10) {
    transition-delay: 0.5s;
  }

  div span:nth-child(11) {
    transition-delay: 0.55s;
  }
`;

const DanceButton: FC<{
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}> = (props) => {
  const danceButtonRef = useRef<any>();

  useEffect(() => {
    danceButtonRef.current.innerHTML =
      '<div><span>' +
      danceButtonRef.current.textContent.trim().split('').join('</span><span>') +
      '</span></div>';

    const spans = danceButtonRef.current.querySelectorAll('span');
    spans.forEach((item: any) => {
      if (+item.textContent === 0) {
        item.className = 'mr-8';
      }
    });
  }, []);

  return (
    <DanceButtonWrap
      onClick={() => props.onClick?.()}
      className={props.className}
      ref={danceButtonRef}
    >
      {props.children}
    </DanceButtonWrap>
  );
};

export default DanceButton;
