import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';

interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

const TitleWrap = styled.div`
  ${flexPos('center')}

  .title-content {
    font-family: Montserrat, Montserrat;
    font-weight: 400;
    font-size: 64rem;
    text-transform: uppercase;
    background: linear-gradient(to right, #3a3a3a, #fff, #3a3a3a);
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const Title = (props: TitleProps) => {
  return (
    <TitleWrap className={props.className}>
      <div className="title-content">{props.children}</div>
    </TitleWrap>
  );
};

export default Title;
