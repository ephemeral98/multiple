import { IWhite } from '@/service/useActivity';
import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';
import Image from 'next/image';
import { plusStar } from '@/utils';
import { $fontSize, $width, phoneSize } from '@/styled/mediaSize';
import EmptyTable from './EmptyTable';

const TableWrap = styled.div`
  ${$width('1600rem', '1200rem', '1200rem')}

  margin: 81rem auto 100rem;
  border: 1px solid #585858;
  border-radius: 10rem;

  .table-header {
    display: grid;
    grid-template-columns: 100rem 1fr 1fr 1fr 1fr 1fr;
    @media (min-width: ${phoneSize}) {
      grid-template-columns: repeat(6, 1fr);
    }
    justify-content: space-between;
    align-items: center;
    place-items: center;
    border: 1px solid #585858;
    border-radius: 10rem;
    height: 72rem;
    /* padding: 0 51rem; */
    white-space: nowrap;
    ${$fontSize('26rem', '14rem', '14rem')}
  }

  .table-container {
    display: grid;
    grid-template-columns: 100rem 1fr 1fr 1fr 1fr 1fr;
    @media (min-width: ${phoneSize}) {
      grid-template-columns: repeat(6, 1fr);
    }
    justify-content: space-between;
    align-items: center;
    place-items: center;
    /* padding: 0 51rem; */
    ${$fontSize('26rem', '14rem', '14rem')}

    > div {
      height: 72rem;
      ${flexPos('center')}
    }
  }
`;

const Table: React.FC<{
  whiteList: IWhite[];
}> = (props) => {
  return (
    <TableWrap>
      <div className="table-header">
        <div>No.</div>
        <div>Wallet Address</div>
        <div>Points</div>
        <div>Phase</div>
        <div>Eligibility Status</div>
        <div>Snapshot Time</div>
      </div>

      {props.whiteList.length ? (
        <>
          {props.whiteList?.map((item) => {
            return (
              <div key={item.id} className="table-container">
                <div className="text-#5C5C5C">{item.seqNo}</div>
                <div className="flex-center">
                  <div>{plusStar(item.walletAddr, 5, 5)}</div>
                  <Image
                    priority
                    data-clipboard-text={item.walletAddr}
                    className="w-26 md:w-20 ml-5 copy-btn cursor-pointer"
                    src={require('@img/common/icon-copy.svg')}
                    alt=""
                    onClick={() => {
                      console.log('click');
                    }}
                  />
                </div>
                <div className="text-#5C5C5C">{item.score}</div>
                <div className="text-#5C5C5C">{item.batchNo}</div>
                <div>Eligibility</div>
                <div className="text-#5C5C5C">{item.snapshotTime}</div>
              </div>
            );
          })}
        </>
      ) : (
        <EmptyTable />
      )}
    </TableWrap>
  );
};

export default Table;
