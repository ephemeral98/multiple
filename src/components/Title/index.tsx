import { $fontSize } from '@/styled/mediaSize';
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
    ${$fontSize('46rem', '64rem', '64rem')}
    text-transform: uppercase;
    /* background: linear-gradient(to right, #3a3a3a, #fff, #3a3a3a); */
    background: linear-gradient(to right, #7895ff 0%, #ffffff 100%);
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
