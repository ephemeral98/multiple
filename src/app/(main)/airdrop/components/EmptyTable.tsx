import { styled } from 'styled-components';
import Image from 'next/image';
import { flexPos } from '@/styled/mixin';

const EmptyTableWrap = styled.div`
  ${flexPos('center')}
  flex-direction: column;

  margin-top: 64rem;
  margin-bottom: 72rem;
`;

const EmptyTable = () => {
  return (
    <EmptyTableWrap>
      <Image priority className="w-108" src={require('@img/common/icon-empty-search.svg')} alt="" />

      <div className="w-467 text-16 mt-16 text-center">
        The EVM wallet address you searched for is NOT on our list of eligible participants. Please
        kindly contact our moderator on Discord if you have any questions.
      </div>
    </EmptyTableWrap>
  );
};

export default EmptyTable;
