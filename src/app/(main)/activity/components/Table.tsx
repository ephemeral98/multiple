import { IWhite } from '@/service/useActivity';
import { flexPos } from '@/styled/mixin';
import { styled } from 'styled-components';
import Image from 'next/image';
import { plusStar } from '@/utils';

const TableWrap = styled.div`
  width: 1200rem;
  margin: 81rem auto 100rem;
  border: 1px solid #585858;
  border-radius: 10rem;

  .table-header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-between;
    align-items: center;
    place-items: center;
    border: 1px solid #585858;
    border-radius: 10rem;
    height: 72rem;
    /* padding: 0 51rem; */
  }

  .table-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-between;
    align-items: center;
    place-items: center;
    /* padding: 0 51rem; */

    > div {
      height: 72rem;
      background-color: tomato;
      border: solid 2px red;
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

      {props.whiteList.map((item) => {
        return (
          <div key={item.id} className="table-container">
            <div>{item.seqNo}</div>
            <div className="flex-center">
              <div>{plusStar(item.walletAddr, 5, 5)}</div>
              <Image
                priority
                className="w-20 ml-5"
                src={require('@img/common/icon-copy.svg')}
                alt=""
                onClick={() => {
                  console.log('click');
                }}
              />
            </div>
            <div>{item.score}</div>
            <div>{item.batchNo}</div>
            <div>Eligibility</div>
            <div>{item.snapshotTime}</div>
          </div>
        );
      })}
    </TableWrap>
  );
};

export default Table;
