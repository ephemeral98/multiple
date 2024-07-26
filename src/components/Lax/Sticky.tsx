import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';

const StickyWrap = styled.div`
  height: 300vh;
  background-color: skyblue;
  padding-top: 300rem;

  .sticky-content {
    position: sticky;
    top: 0;
    z-index: 9;
    flex-direction: column;
    text-align: center;
    background-color: pink;
    width: 300px;
    position: sticky;
    height: 50vh;
  }
`;

const Sticky = () => {
  return (
    <StickyWrap>
      <div className="sticky-content">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum facere iste dolorem
        pariatur atque error nobis asperiores officia quae facilis?
      </div>
    </StickyWrap>
  );
};

export default Sticky;
